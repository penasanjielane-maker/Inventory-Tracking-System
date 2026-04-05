import api from './api.js';

const app = {
    currentSection: 'dashboard',

    init() {
        this.bindEvents();
        this.loadSection('dashboard');
    },

    bindEvents() {
        document.querySelectorAll('.nav-links li').forEach(li => {
            li.addEventListener('click', () => {
                const section = li.getAttribute('data-section');
                this.loadSection(section);
                
                document.querySelectorAll('.nav-links li').forEach(l => l.classList.remove('active'));
                li.classList.add('active');
            });
        });

        document.querySelector('.close-modal').addEventListener('click', () => {
            document.getElementById('modal-container').classList.add('hidden');
        });

        window.onclick = (event) => {
            if (event.target == document.getElementById('modal-container')) {
                document.getElementById('modal-container').classList.add('hidden');
            }
        };
    },

    async loadSection(section) {
        this.currentSection = section;
        document.querySelectorAll('.content-section').forEach(s => s.classList.add('hidden'));
        document.getElementById(section).classList.remove('hidden');
        document.getElementById('section-title').innerText = section.charAt(0).toUpperCase() + section.slice(1);

        switch (section) {
            case 'dashboard':
                await this.loadDashboard();
                break;
            case 'products':
                await this.loadProducts();
                break;
            case 'categories':
                await this.loadCategories();
                break;
            case 'suppliers':
                await this.loadSuppliers();
                break;
            case 'customers':
                await this.loadCustomers();
                break;
            case 'warehouses':
                await this.loadWarehouses();
                break;
            case 'transactions':
                await this.loadTransactions();
                break;
        }
    },

    async loadDashboard() {
        try {
            const [products, categories, suppliers, customers, warehouses, transactions] = await Promise.all([
                api.get('/products'),
                api.get('/categories'),
                api.get('/suppliers'),
                api.get('/customers'),
                api.get('/warehouses'),
                api.get('/stock/transactions')
            ]);

            document.getElementById('stat-total-products').innerText = products.length;
            document.getElementById('stat-total-categories').innerText = categories.length;
            document.getElementById('stat-total-suppliers').innerText = suppliers.length;
            document.getElementById('stat-total-customers').innerText = customers.length;
            document.getElementById('stat-total-warehouses').innerText = warehouses.length;
            document.getElementById('stat-total-transactions').innerText = transactions.length;
            
            const lowStock = products.filter(p => (p.total_quantity || 0) < p.reorder_level);
            document.getElementById('stat-low-stock').innerText = lowStock.length;
        } catch (err) {
            console.error('Error loading dashboard:', err);
        }
    },

    async loadProducts() {
        try {
            const products = await api.get('/products');
            const tbody = document.querySelector('#products-table tbody');
            tbody.innerHTML = products.map(p => `
                <tr>
                    <td>${p.sku}</td>
                    <td>${p.name}</td>
                    <td>${p.category_name || 'N/A'}</td>
                    <td>${p.supplier_name || 'N/A'}</td>
                    <td>${p.reorder_level}</td>
                    <td>${p.total_quantity || 0}</td>
                    <td>
                        <button class="btn-icon" onclick="app.showEditProductModal(${p.id})"><i class="fas fa-edit"></i></button>
                        <button class="btn-icon" onclick="app.showUpdateStockModal(${p.id})"><i class="fas fa-plus-minus"></i></button>
                        <button class="btn-icon text-danger" onclick="app.deleteProduct(${p.id})"><i class="fas fa-trash"></i></button>
                    </td>
                </tr>
            `).join('');
        } catch (err) {
            console.error('Error loading products:', err);
        }
    },

    async loadCategories() {
        try {
            const categories = await api.get('/categories');
            const tbody = document.querySelector('#categories-table tbody');
            tbody.innerHTML = categories.map(c => `
                <tr>
                    <td>${c.name}</td>
                    <td>${c.description}</td>
                    <td>
                        <button class="btn-icon" onclick="app.showEditCategoryModal(${c.id})"><i class="fas fa-edit"></i></button>
                        <button class="btn-icon text-danger" onclick="app.deleteCategory(${c.id})"><i class="fas fa-trash"></i></button>
                    </td>
                </tr>
            `).join('');
        } catch (err) {
            console.error('Error loading categories:', err);
        }
    },

    async loadWarehouses() {
        try {
            const warehouses = await api.get('/warehouses');
            const tbody = document.querySelector('#warehouses-table tbody');
            tbody.innerHTML = warehouses.map(w => `
                <tr>
                    <td>${w.name}</td>
                    <td>${w.location}</td>
                    <td>
                        <button class="btn-icon" onclick="app.showEditWarehouseModal(${w.id})"><i class="fas fa-edit"></i></button>
                        <button class="btn-icon text-danger" onclick="app.deleteWarehouse(${w.id})"><i class="fas fa-trash"></i></button>
                    </td>
                </tr>
            `).join('');
        } catch (err) {
            console.error('Error loading warehouses:', err);
        }
    },

    async loadTransactions() {
        try {
            const transactions = await api.get('/stock/transactions');
            const tbody = document.querySelector('#transactions-table tbody');
            tbody.innerHTML = transactions.map(t => `
                <tr>
                    <td>${new Date(t.created_at).toLocaleString()}</td>
                    <td>${t.product_name}</td>
                    <td>${t.warehouse_name}</td>
                    <td>${t.change_amount}</td>
                    <td>${t.transaction_type}</td>
                </tr>
            `).join('');
        } catch (err) {
            console.error('Error loading transactions:', err);
        }
    },

    // Modal helpers (simplified)
    showModal(title, contentHTML, onSubmit) {
        document.getElementById('modal-title').innerText = title;
        const form = document.getElementById('modal-form');
        form.innerHTML = contentHTML;
        form.onsubmit = async (e) => {
            e.preventDefault();
            const formData = new FormData(form);
            const data = Object.fromEntries(formData.entries());
            await onSubmit(data);
            document.getElementById('modal-container').classList.add('hidden');
            this.loadSection(this.currentSection);
        };
        document.getElementById('modal-container').classList.remove('hidden');
    },

    async showAddCategoryModal() {
        this.showModal('Add Category', `
            <div class="form-group">
                <label>Name</label>
                <input type="text" name="name" required>
            </div>
            <div class="form-group">
                <label>Description</label>
                <textarea name="description"></textarea>
            </div>
            <button type="submit" class="btn btn-primary">Save</button>
        `, async (data) => {
            await api.post('/categories', data);
        });
    },

    async showAddProductModal() {
        try {
            const categories = await api.get('/categories');
            const suppliers = await api.get('/suppliers');
            this.showModal('Add Product', `
                <div class="form-group">
                    <label>SKU</label>
                    <input type="text" name="sku" required>
                </div>
                <div class="form-group">
                    <label>Name</label>
                    <input type="text" name="name" required>
                </div>
                <div class="form-group">
                    <label>Category</label>
                    <select name="category_id">
                        <option value="">Select Category</option>
                        ${categories.map(c => `<option value="${c.id}">${c.name}</option>`).join('')}
                    </select>
                </div>
                <div class="form-group">
                    <label>Supplier</label>
                    <select name="supplier_id">
                        <option value="">Select Supplier</option>
                        ${suppliers.map(s => `<option value="${s.id}">${s.name}</option>`).join('')}
                    </select>
                </div>
                <div class="form-group">
                    <label>Reorder Level</label>
                    <input type="number" name="reorder_level" value="10">
                </div>
                <button type="submit" class="btn btn-primary">Save</button>
            `, async (data) => {
                await api.post('/products', data);
            });
        } catch (err) {
            alert('Failed to load data for modal: ' + err.message);
        }
    },

    async showAddWarehouseModal() {
        this.showModal('Add Warehouse', `
            <div class="form-group">
                <label>Name</label>
                <input type="text" name="name" required>
            </div>
            <div class="form-group">
                <label>Location</label>
                <input type="text" name="location">
            </div>
            <button type="submit" class="btn btn-primary">Save</button>
        `, async (data) => {
            await api.post('/warehouses', data);
        });
    },

    async showEditCategoryModal(id) {
        const categories = await api.get('/categories');
        const category = categories.find(c => c.id === id);
        this.showModal('Edit Category', `
            <div class="form-group">
                <label>Name</label>
                <input type="text" name="name" value="${category.name}" required>
            </div>
            <div class="form-group">
                <label>Description</label>
                <textarea name="description">${category.description || ''}</textarea>
            </div>
            <button type="submit" class="btn btn-primary">Update</button>
        `, async (data) => {
            await api.put(`/categories/${id}`, data);
        });
    },

    async showEditProductModal(id) {
        try {
            const products = await api.get('/products');
            const product = products.find(p => p.id === id);
            const categories = await api.get('/categories');
            const suppliers = await api.get('/suppliers');
            this.showModal('Edit Product', `
                <div class="form-group">
                    <label>SKU</label>
                    <input type="text" name="sku" value="${product.sku}" required>
                </div>
                <div class="form-group">
                    <label>Name</label>
                    <input type="text" name="name" value="${product.name}" required>
                </div>
                <div class="form-group">
                    <label>Category</label>
                    <select name="category_id">
                        <option value="">Select Category</option>
                        ${categories.map(c => `<option value="${c.id}" ${c.id === product.category_id ? 'selected' : ''}>${c.name}</option>`).join('')}
                    </select>
                </div>
                <div class="form-group">
                    <label>Supplier</label>
                    <select name="supplier_id">
                        <option value="">Select Supplier</option>
                        ${suppliers.map(s => `<option value="${s.id}" ${s.id === product.supplier_id ? 'selected' : ''}>${s.name}</option>`).join('')}
                    </select>
                </div>
                <div class="form-group">
                    <label>Reorder Level</label>
                    <input type="number" name="reorder_level" value="${product.reorder_level}">
                </div>
                <button type="submit" class="btn btn-primary">Update</button>
            `, async (data) => {
                await api.put(`/products/${id}`, data);
            });
        } catch (err) {
            alert('Failed to load data for modal: ' + err.message);
        }
    },

    async showEditWarehouseModal(id) {
        const warehouses = await api.get('/warehouses');
        const warehouse = warehouses.find(w => w.id === id);
        this.showModal('Edit Warehouse', `
            <div class="form-group">
                <label>Name</label>
                <input type="text" name="name" value="${warehouse.name}" required>
            </div>
            <div class="form-group">
                <label>Location</label>
                <input type="text" name="location" value="${warehouse.location || ''}">
            </div>
            <button type="submit" class="btn btn-primary">Update</button>
        `, async (data) => {
            await api.put(`/warehouses/${id}`, data);
        });
    },

    async showUpdateStockModal(productId) {
        const warehouses = await api.get('/warehouses');
        this.showModal('Update Stock', `
            <input type="hidden" name="product_id" value="${productId}">
            <div class="form-group">
                <label>Warehouse</label>
                <select name="warehouse_id">
                    ${warehouses.map(w => `<option value="${w.id}">${w.name}</option>`).join('')}
                </select>
            </div>
            <div class="form-group">
                <label>Quantity</label>
                <input type="number" name="change_amount" required min="1">
            </div>
            <div class="form-group">
                <label>Transaction Type</label>
                <select name="transaction_type">
                    <option value="in">In (Addition)</option>
                    <option value="out">Out (Subtraction)</option>
                </select>
            </div>
            <button type="submit" class="btn btn-primary">Update</button>
        `, async (data) => {
            try {
                await api.post('/stock/update', data);
            } catch (err) {
                alert('Failed to update stock: ' + err.message);
            }
        });
    },

    async deleteProduct(id) {
        if (confirm('Are you sure?')) {
            await api.delete(`/products/${id}`);
            this.loadProducts();
        }
    },

    async deleteCategory(id) {
        if (confirm('Are you sure?')) {
            await api.delete(`/categories/${id}`);
            this.loadCategories();
        }
    },

    async deleteWarehouse(id) {
        if (confirm('Are you sure?')) {
            await api.delete(`/warehouses/${id}`);
            this.loadWarehouses();
        }
    },

    async loadSuppliers() {
        try {
            const suppliers = await api.get('/suppliers');
            const tbody = document.querySelector('#suppliers-table tbody');
            tbody.innerHTML = suppliers.map(s => `
                <tr>
                    <td>${s.name}</td>
                    <td>${s.contact_name || ''}</td>
                    <td>${s.email || ''}</td>
                    <td>${s.phone || ''}</td>
                    <td>
                        <button class="btn-icon" onclick="app.showEditSupplierModal(${s.id})"><i class="fas fa-edit"></i></button>
                        <button class="btn-icon text-danger" onclick="app.deleteSupplier(${s.id})"><i class="fas fa-trash"></i></button>
                    </td>
                </tr>
            `).join('');
        } catch (err) {
            console.error('Error loading suppliers:', err);
        }
    },

    async showAddSupplierModal() {
        this.showModal('Add Supplier', `
            <div class="form-group">
                <label>Name</label>
                <input type="text" name="name" required>
            </div>
            <div class="form-group">
                <label>Contact Name</label>
                <input type="text" name="contact_name">
            </div>
            <div class="form-group">
                <label>Email</label>
                <input type="email" name="email">
            </div>
            <div class="form-group">
                <label>Phone</label>
                <input type="text" name="phone">
            </div>
            <div class="form-group">
                <label>Address</label>
                <textarea name="address"></textarea>
            </div>
            <button type="submit" class="btn btn-primary">Save</button>
        `, async (data) => {
            await api.post('/suppliers', data);
        });
    },

    async showEditSupplierModal(id) {
        const suppliers = await api.get('/suppliers');
        const supplier = suppliers.find(s => s.id === id);
        this.showModal('Edit Supplier', `
            <div class="form-group">
                <label>Name</label>
                <input type="text" name="name" value="${supplier.name}" required>
            </div>
            <div class="form-group">
                <label>Contact Name</label>
                <input type="text" name="contact_name" value="${supplier.contact_name || ''}">
            </div>
            <div class="form-group">
                <label>Email</label>
                <input type="email" name="email" value="${supplier.email || ''}">
            </div>
            <div class="form-group">
                <label>Phone</label>
                <input type="text" name="phone" value="${supplier.phone || ''}">
            </div>
            <div class="form-group">
                <label>Address</label>
                <textarea name="address">${supplier.address || ''}</textarea>
            </div>
            <button type="submit" class="btn btn-primary">Update</button>
        `, async (data) => {
            await api.put(`/suppliers/${id}`, data);
        });
    },

    async deleteSupplier(id) {
        if (confirm('Are you sure?')) {
            await api.delete(`/suppliers/${id}`);
            this.loadSuppliers();
        }
    },

    async loadCustomers() {
        try {
            const customers = await api.get('/customers');
            const tbody = document.querySelector('#customers-table tbody');
            tbody.innerHTML = customers.map(c => `
                <tr>
                    <td>${c.name}</td>
                    <td>${c.email || ''}</td>
                    <td>${c.phone || ''}</td>
                    <td>
                        <button class="btn-icon" onclick="app.showEditCustomerModal(${c.id})"><i class="fas fa-edit"></i></button>
                        <button class="btn-icon text-danger" onclick="app.deleteCustomer(${c.id})"><i class="fas fa-trash"></i></button>
                    </td>
                </tr>
            `).join('');
        } catch (err) {
            console.error('Error loading customers:', err);
        }
    },

    async showAddCustomerModal() {
        this.showModal('Add Customer', `
            <div class="form-group">
                <label>Name</label>
                <input type="text" name="name" required>
            </div>
            <div class="form-group">
                <label>Email</label>
                <input type="email" name="email">
            </div>
            <div class="form-group">
                <label>Phone</label>
                <input type="text" name="phone">
            </div>
            <div class="form-group">
                <label>Address</label>
                <textarea name="address"></textarea>
            </div>
            <button type="submit" class="btn btn-primary">Save</button>
        `, async (data) => {
            await api.post('/customers', data);
        });
    },

    async showEditCustomerModal(id) {
        const customers = await api.get('/customers');
        const customer = customers.find(c => c.id === id);
        this.showModal('Edit Customer', `
            <div class="form-group">
                <label>Name</label>
                <input type="text" name="name" value="${customer.name}" required>
            </div>
            <div class="form-group">
                <label>Email</label>
                <input type="email" name="email" value="${customer.email || ''}">
            </div>
            <div class="form-group">
                <label>Phone</label>
                <input type="text" name="phone" value="${customer.phone || ''}">
            </div>
            <div class="form-group">
                <label>Address</label>
                <textarea name="address">${customer.address || ''}</textarea>
            </div>
            <button type="submit" class="btn btn-primary">Update</button>
        `, async (data) => {
            await api.put(`/customers/${id}`, data);
        });
    },

    async deleteCustomer(id) {
        if (confirm('Are you sure?')) {
            await api.delete(`/customers/${id}`);
            this.loadCustomers();
        }
    }
};

window.app = app;
app.init();
