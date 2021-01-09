"use strict";

const React = require("react");

const textEs = {
    WriteOrders: "Escritura de órdenes",
    AffiliatedOrders: "Órdenes afiliadas a mi lavandería",
    MyAccount: "Mi cuenta",
    MyOrders: "Mis órdenes",
    CloseSession: "Cerrar sesión",
    Main: "Principal",
    Language: "Idioma",
    Languages: {
        es: "Español",
        en: "English",
        cn: "中文"
    }
};

const LinksComponent = {
    WriteOrders: WriteOrders,
    AffiliatedOrders: AffiliatedOrders,
    MyMain:MyMain,
    MyOrders: MyOrders,
    MyAccount: MyAccount,
    Logout: Logout,
};

function Logo(){

    return (
        <a href="/"> 
            <img  className="navbar-logo-image"  src="/imgs/tallao-logo-complete-es.svg" alt="Talla'o"></img>
        </a>
    );

}

function ToggleButton(){
    return (
        <a href="#" className="toggle-button">
            <span className="bar"></span>
            <span className="bar"></span>
            <span className="bar"></span>
        </a>
    );
}

function NavbarLinks({links, onClick}){
    return (
        <div className="navbar-links">
            <ul>
                {
                    links.map(link =>{
                        const LinkComponent = LinksComponent[link];
                        return <LinkComponent key={`NavbarLink4${link}`} onClick={(componentID)=> onClick(componentID)}></LinkComponent>;
                    })
                }
            </ul>
        </div>
    );
}

function WriteOrders(){
    return (
        React.createElement(NavbarTagFormat,{
            id: "MasterPanelTag",
            href: "/laundry/panel",
            className: "bottomLineLinkAnimation navBarText blackTxt",
            iconClass: "fa fa-pencil-square-o",
            text: textEs.WriteOrders
        })
    );
}

function AffiliatedOrders(){
    return (
        React.createElement(NavbarTagFormat,{
            id: "AffiliatedOrders",
            href: "/laundry/myorders",
            className: "bottomLineLinkAnimation navBarText blackTxt",
            iconClass: "fa fa-th-list",
            text: textEs.AffiliatedOrders
        })
    );
}

function MyMain(){
    return (
        React.createElement(NavbarTagFormat,{
            id: "MyOrders",
            href: "/user/panel",
            className: "bottomLineLinkAnimation navBarText blackTxt",
            iconClass: "fa fa-home",
            text: textEs.Main
        })
    );
}

function MyOrders(){
    return (
        React.createElement(NavbarTagFormat,{
            id: "MyOrders",
            href: "/user/myorders",
            className: "bottomLineLinkAnimation navBarText blackTxt",
            iconClass: "fa fa-th-list",
            text: textEs.MyOrders
        })
    );
}

function MyAccount(){
    return (
        React.createElement(NavbarTagFormat,{
            id: "MyAccount",
            href: "myaccount",
            className: "bottomLineLinkAnimation navBarText blackTxt",
            iconClass: "fa fa-user-circle",
            text: textEs.MyAccount
        })
    );
}

function Logout({onClick}){
    return (
        React.createElement(NavbarTagFormat,{
            id: "CloseSession",
            href: "#",
            className: "bottomLineLinkAnimation navBarText redTxt",
            iconClass: "fa fa-sign-out",
            text: textEs.CloseSession,
            onClick: (e) => onClick("CloseSession")
            
        })
    );
}

function LanguageSelect({selectedLanguage, onSelect, languages}){
    return (
        <div className="centerOnXs">
            <label htmlFor="language-selector" className="bold">{`${textEs.Language} :`}</label>
            <select id="language-selector" value={selectedLanguage} onChange={(language) => onSelect("LanguageSelect", language)}>
                {
                    languages.map(language =>{
                        return (
                            <option key={`LanguageSelect4${language}`} value={language}>
                                {textEs.Languages[language]}
                            </option>
                        );
                    })
                }
                <option value="es">Español</option>
                <option value="en">English</option>
                <option value="cn">中文</option>
            </select>
        </div>
    );
    /* return (
        React.createElement("div" ,{
            className: "leftSeparation centerOnXs"
        }, 
            [   
                React.createElement("label", {
                    key: "LanguageSelectTag",
                    className: "bold ",
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
    ) */
}


function NavbarTagFormat({id, href, className, iconClass, text, onClick}){
    return (
        React.createElement("a", {
            href: href,
            className: className,
            onClick: () => onClick()
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

module.exports =  {
    Logo: Logo,
    ToggleButton: ToggleButton,
    NavbarLinks: NavbarLinks,
    LanguageSelect: LanguageSelect
};
