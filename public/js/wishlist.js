// wishlist.js
async function toggleWishlist(listingId, icon) {
  const isWished = icon.classList.contains('fa-solid');
  const url = `/wishlist/${listingId}/${isWished ? 'remove' : 'add'}`;

  try {
    const res = await fetch(url, { method: 'POST' });
    if (res.ok) {
      icon.classList.toggle('fa-solid');
      icon.classList.toggle('fa-regular');
      icon.classList.toggle('text-danger');
    } else {
      alert('Please login or try again.');
    }
  } catch (err) {
    console.error('Error updating wishlist:', err);
  }
}