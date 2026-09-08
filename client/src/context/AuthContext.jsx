import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('sri_user');
    return saved ? JSON.parse(saved) : {
      id: 'usr-default',
      name: 'Ramesh Kumar',
      email: 'customer@sriinnovations.com',
      phone: '+91 98450 12345',
      role: 'customer',
      addresses: [
        {
          id: 'addr-1',
          name: 'Ramesh Kumar',
          phone: '+91 98450 12345',
          house: 'Flat 402, Green Valley Apartments',
          street: '14th Cross, 8th Main, Indiranagar',
          city: 'Bangalore',
          state: 'Karnataka',
          pincode: '560038',
          addressType: 'Home',
          isDefault: true
        }
      ]
    };
  });

  const [adminUser, setAdminUser] = useState(() => {
    const saved = localStorage.getItem('sri_admin_user');
    return saved ? JSON.parse(saved) : {
      id: 'adm-01',
      name: 'Sri Administrator',
      email: 'admin@sriinnovations.com',
      role: 'admin'
    };
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('sri_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('sri_user');
    }
  }, [user]);

  useEffect(() => {
    if (adminUser) {
      localStorage.setItem('sri_admin_user', JSON.stringify(adminUser));
    } else {
      localStorage.removeItem('sri_admin_user');
    }
  }, [adminUser]);

  const loginCustomer = (email, password) => {
    const customer = {
      id: 'usr-' + Date.now(),
      name: email.split('@')[0].toUpperCase(),
      email: email,
      phone: '+91 98450 12345',
      role: 'customer',
      addresses: user?.addresses || []
    };
    setUser(customer);
    return customer;
  };

  const registerCustomer = (data) => {
    const customer = {
      id: 'usr-' + Date.now(),
      name: data.name,
      email: data.email,
      phone: data.phone || '+91 98450 12345',
      role: 'customer',
      addresses: []
    };
    setUser(customer);
    return customer;
  };

  const logoutCustomer = () => {
    setUser(null);
  };

  const loginAdmin = (email, password) => {
    if (email.toLowerCase().includes('admin') || password === 'admin123') {
      const admin = {
        id: 'adm-01',
        name: 'Master Admin',
        email: email,
        role: 'admin'
      };
      setAdminUser(admin);
      return admin;
    }
    throw new Error('Invalid administrator credentials.');
  };

  const logoutAdmin = () => {
    setAdminUser(null);
  };

  const updateProfile = (updatedData) => {
    setUser(prev => ({ ...prev, ...updatedData }));
  };

  const addAddress = (newAddr) => {
    const addrWithId = { ...newAddr, id: 'addr-' + Date.now() };
    setUser(prev => {
      let updatedAddresses = [...(prev.addresses || [])];
      if (addrWithId.isDefault) {
        updatedAddresses = updatedAddresses.map(a => ({ ...a, isDefault: false }));
      }
      return {
        ...prev,
        addresses: [...updatedAddresses, addrWithId]
      };
    });
  };

  const deleteAddress = (id) => {
    setUser(prev => ({
      ...prev,
      addresses: prev.addresses.filter(a => a.id !== id)
    }));
  };

  return (
    <AuthContext.Provider value={{
      user,
      adminUser,
      isAuthenticated: !!user,
      isAdminAuthenticated: !!adminUser,
      loginCustomer,
      registerCustomer,
      logoutCustomer,
      loginAdmin,
      logoutAdmin,
      updateProfile,
      addAddress,
      deleteAddress
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
