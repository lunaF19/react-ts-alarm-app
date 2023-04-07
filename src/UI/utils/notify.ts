import { toast } from 'react-toastify';

interface notify {

}

const notify:any = {}
const defaultTimeClose = 3000

notify.info = (message, time, hideProgressBar, closeOnClick, pauseOnHover) => {
    toast.info(message, {
        autoClose: time || defaultTimeClose,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",

    });
}

notify.success = (message, time, hideProgressBar, closeOnClick, pauseOnHover) => {
    toast.success(message, {
        autoClose: time || defaultTimeClose,
        hideProgressBar: hideProgressBar || false,
        closeOnClick: closeOnClick || true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
    });
}

notify.warning = (message, time, hideProgressBar, closeOnClick, pauseOnHover) => {
    toast.warning(message, {
        autoClose: time || defaultTimeClose,
        hideProgressBar: hideProgressBar || false,
        closeOnClick: closeOnClick || true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
    });
}

notify.error = (message, time, hideProgressBar, closeOnClick, pauseOnHover) => {
    toast.error(message, {
        autoClose: time || defaultTimeClose,
        hideProgressBar: hideProgressBar || false,
        closeOnClick: closeOnClick || true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
    });
}

notify.default = (message, time, hideProgressBar, closeOnClick, pauseOnHover) => {
    toast.default(message, {
        autoClose: time || defaultTimeClose,
        hideProgressBar: hideProgressBar || false,
        closeOnClick: closeOnClick || true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
    });
}


notify.promiseStar = (ref, message) => {
    ref.current = toast(message, { autoClose: false, closeOnClick: false, draggable: false });
}

// notify.promiseEnd = (ref, newMessage, type = "error") => {

//     let typeToast
//     switch (type.toLowerCase()) {
//         case "error":
//             typeToast = toast.TYPE.ERROR;
//             break;
//         case "warning":
//             typeToast = toast.TYPE.WARNING;
//             break;
//         default:
//             typeToast = toast.TYPE.SUCCESS
//             break;
//     }
//     toast.update(ref.current, {
//          render: newMessage,
//          type: typeToast, 
//          autoClose: 5000 });

// }

notify.promiseEnd = {}

notify.promiseEnd.success = (ref, newMessage) => {
    toast.update(ref.current, {
        render: newMessage,
        type: toast.TYPE.SUCCESS,
        autoClose: 5000
    });
    ref.current = ""

}

notify.promiseEnd.warning = (ref, newMessage) => {

    toast.update(ref.current, {
        render: newMessage,
        type: toast.TYPE.WARNING,
        autoClose: 5000
    });
    ref.current = ""

}

notify.promiseEnd.error = (ref, newMessage) => {

    toast.update(ref.current, {
        render: newMessage,
        type: toast.TYPE.ERROR,
        autoClose: 5000
    });
    ref.current = ""

}



export default notify