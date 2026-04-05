const db = require('./config/db');

const customers = [
    { name: "Tech Corp International", email: "procurement@techcorp.com", phone: "+1-555-0101", address: "123 Innovation Drive, Silicon Valley, CA" },
    { name: "Global Retail Solutions", email: "info@globalretail.com", phone: "+1-555-0202", address: "456 Market St, New York, NY" },
    { name: "City Public School District", email: "supplies@cityschools.edu", phone: "+1-555-0303", address: "789 Education Lane, Chicago, IL" },
    { name: "Metro General Hospital", email: "logistics@metrohospital.org", phone: "+1-555-0404", address: "101 Wellness Blvd, Houston, TX" },
    { name: "Sunshine Cafe & Bistro", email: "orders@sunshinecafe.com", phone: "+1-555-0505", address: "202 Main St, Miami, FL" },
    { name: "Build-It Construction Group", email: "purchasing@buildit.com", phone: "+1-555-0606", address: "303 Industry Way, Denver, CO" },
    { name: "Alice Johnson", email: "alice.j@email.com", phone: "+1-555-0707", address: "404 Residential Ave, Seattle, WA" },
    { name: "Bob Smith", email: "bob.smith@email.com", phone: "+1-555-0808", address: "505 Quiet Rd, Portland, OR" },
    { name: "Office Hub Coworking", email: "manager@officehub.com", phone: "+1-555-0909", address: "606 Collaboration St, Austin, TX" },
    { name: "Elite Fitness Center", email: "frontdesk@elitefitness.com", phone: "+1-555-1010", address: "707 Strength Blvd, Las Vegas, NV" }
];

async function seedCustomers() {
    try {
        console.log('Seeding customers...');
        for (const customer of customers) {
            await db.query(
                'INSERT IGNORE INTO customers (name, email, phone, address) VALUES (?, ?, ?, ?)',
                [customer.name, customer.email, customer.phone, customer.address]
            );
            console.log(`Added/Verified customer: ${customer.name}`);
        }
        console.log('Finished seeding customers.');
    } catch (err) {
        console.error('Error seeding customers:', err.message);
    } finally {
        process.exit();
    }
}

seedCustomers();
