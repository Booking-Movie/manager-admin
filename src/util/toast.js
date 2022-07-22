import toast from 'react-hot-toast';
const promise = new Promise(resolve => setTimeout(resolve, 4000));
export const notifyToast = async (loading, success) => {
    await toast.promise(
        promise,
        {
            loading: loading,
            success: success,
            error: (error) => `Error: ${error}`,
        },
        {
            style: {
                padding: '8px 16px',
                borderRadius: '8px',
                border: '1px solid white',
            },
        }
    );
};
