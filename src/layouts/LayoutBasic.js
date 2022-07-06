import React from "react";
import { Outlet } from "react-router-dom";
import { Container } from "semantic-ui-react";
import Header from "../components/Header";

export default function LayoutBasic() {
    return (
        <>
            <div>
                <Header/>
                <Container className="layout-basic">
                    <Outlet/>
                </Container>
            </div>
        </>
        
    )
}