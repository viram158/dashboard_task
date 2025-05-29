import axios from 'axios'

const Base_url =    'https://mamun-reza-freeshops-backend.vercel.app/api/v1';
   console.log(sessionStorage.getItem('authtoken'))
const Api = axios.create({
    baseURL: Base_url,
    headers: {
        'Accept': 'application/json',
        // Authorization: `Bearer ${sessionStorage.getItem('authtoken')}`
    }
});


Api.interceptors.request.use(config => {
    const token = sessionStorage.getItem('authtoken');
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }
    if (config.data instanceof FormData) {
        config.headers['Content-Type'] = 'multipart/form-data';
    } else {
        config.headers['Content-Type'] = 'application/json';
    }
    return config;
}, error => {
    return Promise.reject(error);
});
const ApiService = {
       
    createArticle : (data) => Api.post('/admin/Article/createArticle',data),
    getAllarticles: (params) => Api.get('/admin/Article/getArticle',{params}),
    updateArticle: (id, data) => Api.put(`/admin/Article/updateArticle/${id}`, data),
    deleteArticle: (id) => Api.delete(`/admin/Article/deleteArticle/${id}`),
    createAutodealerShip : (data) => Api.post('/admin/AutoDealerShip/addAutoDealerShip', data),
    getAllAutoDealership : ()  => Api.get('/admin/AutoDealerShip/allAutoDealerShip'),
    createBlogcategory : (data) => Api.post('/admin/BlogCategory/addBlogCategory', data),
    getAllBlogcategory : (data) => Api.get('/admin/BlogCategory/allBlogCategory', data),
    updateBlogCategory: (id, data) => Api.put(`/admin/BlogCategory/updateBlogCategory/${id}`, data),
    deleteBlogCategory: (id) => Api.delete(`/admin/BlogCategory/deleteBlogCategory/${id}`),
    createBlogPage: (data) => Api.post('/admin/createBlogPage',data),
    allBlogPage: () => Api.get('/admin/allBlogPage'),
    createfaq : (data) => Api.post('/faq/add', data),
    getfaq : () => Api.get('/faq/all'),
    updatefaq : (id, data) => Api.put(`/faq/update/${id}`, data),
    deletefaq : (id) => Api.delete(`/faq/delete/${id}`),
    login : (data) => Api.post('/admin/login',data),

};

export default ApiService;