document.addEventListener('DOMContentLoaded', function() {
    // Get elements
    const orderNumberElement = document.getElementById('orderNumber');
    const deliveryDetailsElement = document.getElementById('deliveryDetails');
    const paymentDetailsElement = document.getElementById('paymentDetails');
    const orderedItemsElement = document.getElementById('orderedItems');
    const subtotalElement = document.querySelector('.subtotal');
    const shippingElement = document.querySelector('.shipping');
    const totalElement = document.querySelector('.total-amount');
    const printOrderBtn = document.querySelector('.print-order');

    // Get order data from localStorage
    const orderData = JSON.parse(localStorage.getItem('orderData')) || {};

    // Display order number
    if (orderNumberElement) {
        orderNumberElement.textContent = orderData.orderNumber || 'N/A';
    }

    // Display delivery details
    if (deliveryDetailsElement && orderData.delivery) {
        deliveryDetailsElement.innerHTML = `
            <div class="detail-item">
                <div class="detail-label">Nume</div>
                <div class="detail-value">${orderData.delivery.firstName} ${orderData.delivery.lastName}</div>
            </div>
            <div class="detail-item">
                <div class="detail-label">Email</div>
                <div class="detail-value">${orderData.delivery.email}</div>
            </div>
            <div class="detail-item">
                <div class="detail-label">Telefon</div>
                <div class="detail-value">${orderData.delivery.phone}</div>
            </div>
            <div class="detail-item">
                <div class="detail-label">Adresă</div>
                <div class="detail-value">${orderData.delivery.address}, ${orderData.delivery.county}</div>
            </div>
            <div class="detail-item">
                <div class="detail-label">Metodă Livrare</div>
                <div class="detail-value">${orderData.delivery.deliveryMethod === 'pickup' ? 'Ridicare din Magazin' : 'Curier'}</div>
            </div>
        `;
    }

    // Display payment details
    if (paymentDetailsElement && orderData.payment) {
        const paymentMethod = orderData.payment.method === 'cash' ? 'Plată la Livrare - Cash' : 'Plată la Livrare - Card';
        paymentDetailsElement.innerHTML = `
            <div class="detail-item">
                <div class="detail-label">Metodă de Plată</div>
                <div class="detail-value">${paymentMethod}</div>
            </div>
            <div class="detail-item">
                <div class="detail-label">Status Plată</div>
                <div class="detail-value">În așteptare</div>
            </div>
        `;
    }

    // Display ordered items
    if (orderedItemsElement && orderData.cart) {
        let subtotal = 0;
        
        orderData.cart.forEach(item => {
            subtotal += item.price * item.quantity;
            
            const itemElement = document.createElement('div');
            itemElement.className = 'ordered-item';
            itemElement.innerHTML = `
                <div class="item-image">
                    <img src="${item.image}" alt="${item.name}">
                </div>
                <div class="item-details">
                    <div class="item-name">${item.name}</div>
                    <div class="item-price">${item.price} lei</div>
                    <div class="item-quantity">Cantitate: ${item.quantity}</div>
                </div>
                <div class="item-total">${item.price * item.quantity} lei</div>
            `;
            orderedItemsElement.appendChild(itemElement);
        });

        // Update summary
        const shipping = orderData.delivery.deliveryMethod === 'pickup' ? 0 : 15;
        const total = subtotal + shipping;

        subtotalElement.textContent = `${subtotal} lei`;
        shippingElement.textContent = shipping === 0 ? 'Gratuit' : `${shipping} lei`;
        totalElement.textContent = `${total} lei`;
    }

    // Handle print button
    if (printOrderBtn) {
        printOrderBtn.addEventListener('click', () => {
            window.print();
        });
    }

    // Clear cart and order data from localStorage
    localStorage.removeItem('cart');
    localStorage.removeItem('deliveryData');
    // Keep orderData for reference
});
