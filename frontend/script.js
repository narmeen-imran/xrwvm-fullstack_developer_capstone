// Dynamic host detection for GitHub Codespaces & Localhost
const getBaseHost = () => {
  const host = window.location.hostname;
  const protocol = window.location.protocol;
  
  if (host.includes('github.dev') || host.includes('app.github.dev')) {
    // Replaces the 8000 port segment in the hostname with target ports
    const baseDomain = host.replace(/.*?-8000\./, '');
    const prefix = host.split('-8000.')[0];
    return {
      node: `${protocol}//${prefix}-3000.${baseDomain}`,
      python: `${protocol}//${prefix}-5000.${baseDomain}`
    };
  }
  
  return {
    node: 'http://localhost:3000',
    python: 'http://localhost:5000'
  };
};

const { node: NODE_API, python: PYTHON_API } = getBaseHost();

document.addEventListener('DOMContentLoaded', fetchDealers);

async function fetchDealers() {
  const container = document.getElementById('dealers-container');
  
  try {
    const res = await fetch(`${NODE_API}/fetchDealers`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });

    if (!res.ok) throw new Error(`Server returned status ${res.status}`);
    const dealers = await res.json();
    
    container.innerHTML = dealers.map(d => `
      <div class="card">
        <h3>${d.name}</h3>
        <p><strong>Location:</strong> ${d.address}, ${d.city}, ${d.state} ${d.zip}</p>
        <button onclick="viewReviews(${d.id}, '${d.name}')">View Reviews</button>
      </div>
    `).join('');
  } catch (err) {
    console.error("Fetch Error Details:", err);
    container.innerHTML = `
      <div class="card" style="border-left: 4px solid #dc3545;">
        <p class="error"><strong>Connection Error</strong></p>
        <p>Target URL: <code>${NODE_API}/fetchDealers</code></p>
        <button onclick="testDirectConnection('${NODE_API}/fetchDealers')">Click Here to Authorize Port Access</button>
      </div>`;
  }
}

function testDirectConnection(url) {
  // Opening the direct URL in a new tab bypasses Codespaces OAuth cookie blocks
  window.open(url, '_blank');
}

async function viewReviews(dealerId, dealerName) {
  document.getElementById('dealer-section').style.display = 'none';
  document.getElementById('review-section').style.display = 'block';
  document.getElementById('dealer-title').innerText = dealerName;

  const reviewsContainer = document.getElementById('reviews-container');
  reviewsContainer.innerHTML = 'Loading reviews...';

  try {
    const res = await fetch(`${NODE_API}/fetchReviews/dealer/${dealerId}`);
    const reviews = await res.json();
    
    if (reviews.length === 0) {
      reviewsContainer.innerHTML = '<p>No reviews available for this dealership.</p>';
      return;
    }

    reviewsContainer.innerHTML = '';

    for (let r of reviews) {
      let sentimentData = { sentiment: 'neutral', label: 'NEUTRAL' };
      try {
        const sentRes = await fetch(`${PYTHON_API}/analyze/${encodeURIComponent(r.review)}`);
        sentimentData = await sentRes.json();
      } catch (e) {
        console.warn("Sentiment service unreachable:", e);
      }
      
      reviewsContainer.innerHTML += `
        <div class="review-card">
          <div class="review-header">
            <strong>${r.name}</strong> 
            <span class="car-info">(${r.car_year} ${r.car_make} ${r.car_model})</span>
          </div>
          <p class="review-text">"${r.review}"</p>
          <span class="badge ${sentimentData.sentiment}">${sentimentData.label}</span>
        </div>
      `;
    }
  } catch (err) {
    reviewsContainer.innerHTML = `<p class="error">Failed to load reviews.</p>`;
  }
}

function showDealers() {
  document.getElementById('dealer-section').style.display = 'block';
  document.getElementById('review-section').style.display = 'none';
}