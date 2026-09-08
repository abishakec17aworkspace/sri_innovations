export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount || 0);
};

export const formatDate = (dateString) => {
  if (!dateString) return 'N/A';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

export const formatDateTime = (dateString) => {
  if (!dateString) return 'N/A';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

export const maskAadhaar = (aadhaarStr) => {
  if (!aadhaarStr) return '';
  const clean = aadhaarStr.replace(/\s+/g, '');
  if (clean.length < 4) return 'XXXX XXXX ' + clean;
  const last4 = clean.slice(-4);
  return `XXXX XXXX ${last4}`;
};

export const generateOrderId = () => {
  const prefix = 'SRI';
  const random = Math.floor(100000 + Math.random() * 900000);
  return `${prefix}-${random}`;
};

export const generateBookingId = () => {
  const prefix = 'SRI-SRV';
  const random = Math.floor(10000 + Math.random() * 90000);
  return `${prefix}-${random}`;
};
