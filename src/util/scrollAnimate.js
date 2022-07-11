export const scrollToElement = (id) => {
    document.getElementById(id)?.scrollIntoView({
        behavior: 'smooth',
    });
};

export const scrollToElementByClassName = (className) => {
    document.getElementsByClassName(className)[0]?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
    });
};
