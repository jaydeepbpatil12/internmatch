// Run this in browser console (F12) to clean up old organization data

console.log('🧹 Starting localStorage cleanup...');

// Get current user
const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');
const currentUserId = userInfo.email || userInfo.id || 'default';

console.log('👤 Current User:', currentUserId);

// List of old keys to remove (non-user-specific)
const oldKeys = [
    'orgListings',
    'orgApplicants',
    'orgProfile'
];

// Remove old keys
oldKeys.forEach(key => {
    const value = localStorage.getItem(key);
    if (value) {
        console.log(`❌ Removing old key: ${key}`);
        localStorage.removeItem(key);
    }
});

// Show what's left
console.log('\n📊 Remaining organization keys:');
Object.keys(localStorage)
    .filter(k => k.startsWith('org'))
    .forEach(key => {
        console.log(`  ✅ ${key}`);
    });

console.log('\n✨ Cleanup complete! Refresh the page (F5)');
