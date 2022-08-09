import React, { Fragment } from 'react'
import { Route } from 'react-router-dom'
import Header from './Layout/Header'

export const AdminTemPlate = (props) => {
    const { Component, ...restRoute } = props
    return <Route{...restRoute} render={(propsRoute) => {
        return <Fragment>
            <Header {...propsRoute} />
            <Component {...propsRoute} />
        </Fragment>
    }} />
}
