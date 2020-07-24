import React from "react";
import { Switch, Redirect } from "react-router-dom";
import { RouteWithLayout } from "./components";
import { Main as MainLayout, Minimal as MinimalLayout } from "./layouts";
import MetaMaskOnboarding from "@metamask/onboarding";

import {
    Dashboard as DashboardView,
    DataSetList as DataSetListView,
    Account as AccountView,
    Analytics as AnalyticsView,
    NotFound as NotFoundView,
    NoMetamask as NoMetamaskView,
} from "./views";

const Routes = () => {
    const [isEnabled, setEnabled] = React.useState(false);
    const [accounts, setAccounts] = React.useState([]);
    const onboarding = React.useRef();

    React.useEffect(() => {
        if (!onboarding.current) {
            onboarding.current = new MetaMaskOnboarding();
        }
    }, []);

    React.useEffect(() => {
        if (MetaMaskOnboarding.isMetaMaskInstalled()) {
            if (accounts.length > 0) {
                // setButtonText(CONNECTED_TEXT);
                setEnabled(true);
                onboarding.current.stopOnboarding();
            } else {
                // setButtonText(CONNECT_TEXT);
                setEnabled(false);
            }
        }
    }, [accounts]);

    React.useEffect(() => {
        function handleNewAccounts(newAccounts) {
            setAccounts(newAccounts);
        }
        if (MetaMaskOnboarding.isMetaMaskInstalled()) {
            window.ethereum.request({ method: "eth_requestAccounts" }).then(handleNewAccounts);
            window.ethereum.on("accountsChanged", handleNewAccounts);
            return () => {
                window.ethereum.off("accountsChanged", handleNewAccounts);
            };
        }
    }, []);

    return (
        <Switch>
            {!isEnabled && (
                <MinimalLayout>
                    <NoMetamaskView></NoMetamaskView>
                </MinimalLayout>
            )}

            <Redirect exact from="/" to="/dashboard" />
            <RouteWithLayout component={DashboardView} exact layout={MainLayout} path="/dashboard" />
            <RouteWithLayout component={DataSetListView} exact layout={MainLayout} path="/datasets" />
            <RouteWithLayout component={AccountView} exact layout={MainLayout} path="/account" />
            <RouteWithLayout component={AnalyticsView} exact layout={MainLayout} path="/analytics" />

            <RouteWithLayout component={NotFoundView} exact layout={MinimalLayout} path="/not-found" />
            <Redirect to="/not-found" />
        </Switch>
    );
};

export default Routes;
