const formatCurrency = (number, country = 'id-ID', currency = 'IDR') =>
  new Intl.NumberFormat(country, {
    style: 'currency',
    currency,
  }).format(number);

export default formatCurrency;
