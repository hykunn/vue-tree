export const throttle = (func, wait) => {
    let last = 0;
    return () => {
        const current_time = +new Date();
        if (current_time - last > wait) {
            func.apply(this, arguments);
            last = +new Date();
        }
    };
};
