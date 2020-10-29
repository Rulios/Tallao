"use strict";
require.config({
    paths: {
        'react': 'https://unpkg.com/react@16/umd/react.development',
    }
});
define(["react"], function(React){

    const textEs = {
        WriteOrders: "Escritura de órdenes",
        AffiliatedOrders: "Órdenes afiliadas a mi lavandería",
        MyAccount: "Mi cuenta",
        MyOrders: "Mis órdenes",
        CloseSession: "Cerrar sesión",
        Language: "Idioma",
        Languages: {
            es: "Español",
            en: "English",
            cn: "中文"
        }
    };

    function Logo(){
        return (
            React.createElement("a", {
                className: "navbar-brand text-center",
                href: "index.html"
            },
                React.createElement("img", {
                    style:{width:"60%"},
                    src: "imgs/Tallao-Complete-es.svg",
                    alt: "Talla'o"
                })
            )
        );
    }

    function WriteOrders(){
        return (
            React.createElement(NavbarTagFormat,{
                id: "MasterPanelTag",
                href: "masterpanel.html",
                className: "bottomLineLinkAnimation navBarText",
                iconClass: "fa fa-pencil-square-o",
                text: textEs.WriteOrders
            })
        );
    }

    function AffiliatedOrders(){
        return (
            React.createElement(NavbarTagFormat,{
                id: "AffiliatedOrders",
                href: "myorders.html",
                className: "bottomLineLinkAnimation navBarText",
                iconClass: "fa fa-th-list",
                text: textEs.AffiliatedOrders
            })
        );
    }

    function MyOrders(){
        return (
            React.createElement(NavbarTagFormat,{
                id: "MyOrders",
                href: "myorders.html",
                className: "bottomLineLinkAnimation navBarText",
                iconClass: "fa fa-th-list",
                text: text.MyOrders
            })
        );
    }
    
    function MyAccount(){
        return (
            React.createElement(NavbarTagFormat,{
                id: "MyAccount",
                href: "myaccount.html",
                className: "bottomLineLinkAnimation navBarText",
                iconClass: "fa fa-user-circle",
                text: textEs.MyAccount
            })
        );
    }

    function Logout({onClick}){
        return (
            React.createElement(NavbarTagFormat,{
                id: "CloseSession",
                href: "",
                className: "bottomLineLinkAnimation redTxt",
                iconClass: "fa fa-sign-out",
                text: textEs.CloseSession,
                onClick: () => onClick("CloseSession")
            })
        );
    }

    function LanguageSelect({selectedLanguage, onSelect, languages}){
        return (
            React.createElement("div" ,{
                className: "leftSeparation centerOnXs"
            }, 
                [   
                    React.createElement("label", {
                        key: "LanguageSelectTag",
                        className: "bold small-rightMargin",
                        htmlFor: "LanguageSelectSelect"
                    }, `${textEs.Language}:`),
                    React.createElement("select", {
                        key: "LanguageSelect",
                        id: "LanguageSelectSelect",
                        value: selectedLanguage,
                        onChange: (language) => onSelect("LanguageSelect",language)
                    },
                        languages.map(language =>{
                            return React.createElement("option", {
                                key: `LanguageSelect4${language}`,
                                value: language
                            }, textEs.Languages[language])
                        }) 
                    )
                ]
            )
        )
    }
    

    function NavbarTagFormat({id, href, className, iconClass, text}){
        return (
            React.createElement("a", {
                href: href,
                className: className
            },
                [
                    React.createElement("i", {
                        key: `Icon4${id}`,
                        className: `${iconClass} small-rightMargin`,
                        "aria-hidden": "true"
                    }),
                    React.createElement("span", {
                        key: `TagText4${id}`,
                        className:"bold"
                    }, text)
                ]
            )
        );
    }

    return {
        Logo: Logo,
        WriteOrders: WriteOrders,
        AffiliatedOrders: AffiliatedOrders,
        MyOrders: MyOrders,
        MyAccount: MyAccount,
        Logout: Logout,
        LanguageSelect: LanguageSelect
    };

});
