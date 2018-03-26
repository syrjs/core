import { Component } from '../index';

const headers = new Headers({
  'Content-Type': 'application/json',
});

fetch('https://httpbin.org/post', {
  mode: 'bypass',
  method: 'POST',
  headers: headers,
  body:
    '{"query":"\\n    query {\\n      user {\\n        name {\\n          givenName\\n        }\\n        locale {\\n          locale\\n          country\\n        }\\n        profileImage(type: S) {\\n          url {\\n            href\\n          }\\n        }\\n      }\\n      checkoutSession(token:\\"PAY-5YF045298M3874233LKBBRBY\\") {\\n        flags  {\\n          isChangeShippingAddressAllowed\\n          isDigitalGoodsIntegration\\n        }\\n        shippingAddresses {\\n          addressId\\n          line1\\n          line2\\n          city\\n          state\\n          postalCode\\n          country\\n          fullAddress\\n          isSelected\\n          isDefaultShipping\\n          fullName\\n        }\\n        offers {\\n          referenceId\\n          page\\n          phase\\n          status\\n          type\\n          valid\\n          content\\n        }\\n        fundingOptions {\\n          fundingOptionId\\n          name\\n          type\\n          lastDigits\\n          isPreferred\\n          plans {\\n            soloPlan {\\n              planId,\\n              backupFundingOption {\\n                name\\n                lastDigits\\n              }\\n            }\\n            splitPlans {\\n              planId\\n              secondaryFundingOption {\\n                amount {\\n                  currencyFormat\\n                }\\n              }\\n            }\\n          }\\n        }\\n        cart {\\n          returnUrl {\\n            href\\n          }\\n          cancelUrl {\\n            href\\n          }\\n          total {\\n            currencyFormatSymbolISOCurrency\\n          }\\n          amounts {\\n            subtotal {\\n              currencyFormatSymbolISOCurrency\\n            }\\n            tax {\\n              currencyFormatSymbolISOCurrency\\n            }\\n            shippingAndHandling {\\n              currencyFormatSymbolISOCurrency\\n            }\\n            shippingDiscount {\\n              currencyFormatSymbolISOCurrency\\n            }\\n            insurance {\\n              currencyFormatSymbolISOCurrency\\n            }\\n            total {\\n              currencyFormatSymbolISOCurrency\\n            }\\n          }\\n          items {\\n            name\\n            description\\n            unitPrice {\\n              currencyFormat\\n            }\\n            quantity\\n            total {\\n              currencyFormatSymbolISOCurrency\\n            }\\n          }\\n        }\\n      }\\n    }\\n  "}',
}).then(res => {
  console.log(res.json());
});
