document.getElementById('date-form').addEventListener('submit', function (e) {

    e.preventDefault();
    const dateInput = document.getElementById('date-input').value;
  
    fetch(`/api/timestamp/${dateInput}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        const result = document.getElementById('result');
        if (data.error) {
          result.innerHTML = `<p>Error: ${data.error}</p>`;
        } else {
          result.innerHTML = `<p>Unix Timestamp: ${data.unix}</p>
                              <p>UTC Timestamp: ${data.utc}</p>`;
        }
      });
  });
  