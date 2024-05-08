export const getOrderCountByStatus = (status) => {

    const token = localStorage.getItem('token');

    return fetch(`http://localhost:8080/api/v1/admin/orders/${status}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        throw error;
      });
  }

  export const getItemsSold = () => {

    const token = localStorage.getItem('token');

    return fetch(`http://localhost:8080/api/v1/admin/totalItemsSold`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        throw error;
      });
  }

  export const getTotalEarnings = (status) => {

    const token = localStorage.getItem('token');

    return fetch(`http://localhost:8080/api/v1/admin/totalEarning`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        throw error;
      });
  }

  export const getOrderStatistic = (fromDate, toDate) => {

    const token = localStorage.getItem('token');

    return fetch(`http://localhost:8080/api/v1/admin/orderStatistic?fromDate=${fromDate}&toDate=${toDate}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        throw error;
      });
  }

export const calculateDateDifference = (fromDate, toDate) => {
    const date1 = new Date(fromDate);
    const date2 = new Date(toDate);
    const difference = date2 - date1;
    const daysDifference = Math.floor(difference / (1000 * 60 * 60 * 24));
    return daysDifference;
}
