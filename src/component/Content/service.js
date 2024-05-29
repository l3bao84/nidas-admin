import { useState, useEffect, useCallback } from 'react';

export const getOrderCountByStatus = (status) => {
    const token = localStorage.getItem('token');

    return fetch(`http://localhost:8080/api/v1/admin/orders/${status}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .catch((error) => {
            console.error('Error fetching data:', error);
            throw error;
        });
};

export const getItemsSold = () => {
    const token = localStorage.getItem('token');

    return fetch(`http://localhost:8080/api/v1/admin/totalItemsSold`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .catch((error) => {
            console.error('Error fetching data:', error);
            throw error;
        });
};

export const getTotalEarnings = (status) => {
    const token = localStorage.getItem('token');

    return fetch(`http://localhost:8080/api/v1/admin/totalEarning`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .catch((error) => {
            console.error('Error fetching data:', error);
            throw error;
        });
};

export const getOrderStatistic = (fromDate, toDate) => {
    const token = localStorage.getItem('token');

    return fetch(`http://localhost:8080/api/v1/admin/orderStatistic?fromDate=${fromDate}&toDate=${toDate}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .catch((error) => {
            console.error('Error fetching data:', error);
            throw error;
        });
};

export const calculateDateDifference = (fromDate, toDate) => {
    const date1 = new Date(fromDate);
    const date2 = new Date(toDate);
    const difference = date2 - date1;
    const daysDifference = Math.floor(difference / (1000 * 60 * 60 * 24));
    return daysDifference;
};

export const useProducts = (keyword,page) => {
    const [products, setProducts] = useState([]);
    const [totalPages, setTotalPages] = useState(0);

    const fetchProducts = useCallback(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            return;
        }

        fetch(`http://localhost:8080/product/admin?keyword=${keyword}&page=${page}`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Failed to fetch products');
                }
                return response.json();
            })
            .then((data) => {
                if (data && data.content) {
                    setProducts(data.content);
                    setTotalPages(data.totalPages);
                } else {
                    throw new Error('No products data found');
                }
            })
            .catch((error) => {
                console.error('Failed to fetch products', error);
            })
    }, [keyword,page]);

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    return { products, totalPages, refreshProducts: fetchProducts };
};

export const useOrders = (id,page) => {
    const [orders, setOrders] = useState([]);
    const [totalPages, setTotalPages] = useState(0);

    const fetchOrders = useCallback(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            return;
        }

        fetch(`http://localhost:8080/api/v1/admin/orders?id=${id}&page=${page}`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Failed to fetch orders');
                }
                return response.json();
            })
            .then((data) => {
                if (data) {
                    setOrders(data.data.content);
                    setTotalPages(data.data.totalPages);
                } else {
                    throw new Error('No orders data found');
                }
            })
            .catch((error) => {
                console.error('Failed to fetch orders', error);
            })
    }, [id,page]);

    useEffect(() => {
        fetchOrders();
    }, [fetchOrders]);

    return { orders, totalPages, refreshOrders: fetchOrders };
};

export const updateOrder = async (formData) => {
    const token = localStorage.getItem('token');
    try {
        const response = await fetch('http://localhost:8080/api/v1/admin/orders/update', {
            method: 'PATCH',
            headers: {
                Authorization: `Bearer ${token}`,
                'Accept': 'application/json',
            },
            body: formData
        });

        if (!response.ok) {
            throw new Error('Failed to update the order');
        }

        const result = await response.json();
        console.log('Order updated successfully:', result);
    } catch (error) {
        console.error('Failed to update the order:', error);
        throw error;
    }
};

export const getCategories = () => {

    return fetch(`http://localhost:8080/category`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .catch((error) => {
            console.error('Error fetching data:', error);
            throw error;
        });
}

export const addProduct = async (formData) => {
    const token = localStorage.getItem('token');
    try {
        const response = await fetch('http://localhost:8080/product/admin/add', {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`,
                'Accept': 'application/json',
            },
            body: formData
        });

        if (!response.ok) {
            throw new Error('Failed to add product');
        }

        const result = await response.json();
        console.log('Add product successfully:', result);
    } catch (error) {
        console.error('Failed to add product:', error);
        throw error;
    }
};

export const removeProduct = async (id) => {
    const token = localStorage.getItem('token');
    try {
        const response = await fetch(`http://localhost:8080/product/admin/remove/${id}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
        });

        if (!response.ok) {
            throw new Error('Failed to remove product');
        }

        const result = await response.json();
        console.log('Remove product successfully:', result);
    } catch (error) {
        console.error('Failed to remove product:', error);
        throw error;
    }
};

export const updateProduct = async (formData, id) => {
    const token = localStorage.getItem('token');
    try {
        const response = await fetch(`http://localhost:8080/product/admin/update/${id}`, {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${token}`,
                'Accept': 'application/json',
            },
            body: formData
        });

        if (!response.ok) {
            throw new Error('Failed to update product');
        }

        const result = await response.json();
        console.log('Update product successfully:', result);
    } catch (error) {
        console.error('Failed to update product:', error);
        throw error;
    }
};