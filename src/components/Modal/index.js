import React from 'react';
import * as Icon from 'react-feather';
import Portal from '../Portal';


const Modal = ({ onCancel, headerText, children }) => {
    return (
        <>
            <div onClick={onCancel} className="modal-bg" />
            <Portal>
                <div className="modal-container">
                    <div className="flex flex-col gap-6">
                        <button icon className="modal__button-close" onClick={onCancel}>
                            <Icon.X size={32} color="black" />
                        </button>
                        <div className={`${(headerText) ? 'modal-header mt-[calc(32px+16px)]' : 'invisible'}`}>
                            <h1>{headerText}</h1>
                        </div>
                        <div className="modal-content">{children}</div>
                    </div>
                </div>
            </Portal>
        </>
    );
};

export default Modal