import React, { Fragment } from 'react'
import { useSelector } from 'react-redux'
import { Redirect, Route } from 'react-router-dom'
import { USER_LOGIN } from '../../util/setting/config'
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
