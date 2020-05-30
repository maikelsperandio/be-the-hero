export const isAuthenticated = () => {
    const ongId = localStorage.getItem('ongId');
    if(ongId)
        return true;
    else
        return false;
};