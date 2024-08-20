let userId = localStorage.getItem('userId');
document.addEventListener("DOMContentLoaded", function() {
    fetch(`https://nebulacoindatabase.site/getData?userId=${userId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => {
        if (!data || !data.referals) {
            console.error('Invalid data structure:', data);
            return;
        }
        document.getElementById('friends-count').textContent = `${data.referals_count} Friends`;
            
        const frensListBox = document.getElementById('frens-list-box');
        data.referals.forEach(referal => {
            const frenDataDiv = document.createElement('div');
            frenDataDiv.className = 'frens-data';
                
            frenDataDiv.innerHTML = `
                <div class="frens-profile">
                    <div class="frens-profile-data">
                        <h4>${referal.username}</h4>
                        <div>
                            <img src="./assets/images/coin.png" width="15px">
                            <span>${referal.balance}</span>
                        </div>
                    </div>
                </div>
                <div class="frens-data-count">
                    <span>+${referal.balance}</span>
                    <svg href="t.me/${referal.username}" width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9 5L14.15 10C14.4237 10.2563 14.6419 10.5659 14.791 10.9099C14.9402 11.2539 15.0171 11.625 15.0171 12C15.0171 12.375 14.9402 12.7458 14.791 13.0898C14.6419 13.4339 14.4237 13.7437 14.15 14L9 19" stroke="#ffffff" opacity="0.4" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </div>
            `;
                
            frensListBox.appendChild(frenDataDiv);
        });
    })
    .catch(error => console.error('Error fetching data:', error));
});