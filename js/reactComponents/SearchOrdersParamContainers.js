"use strict";
require.config({
    paths: {
        'react': 'https://unpkg.com/react@16/umd/react.development',
        SearchOrdersParamComp: "./reactComponents/SearchOrdersParamComp"
    }
});
define(["react", "SearchOrdersParamComp"], function(React, SearchOrdersParamComp){

    /* This is a middle order component, responsible for translation
    and bundling of low order components */

    const textEs = {
        searchBy: "Buscar por:",
        dateAssign: "Fecha asignada",
        dateReceive: "Fecha recibida",
        dateRange: "Entre dos fechas",
        orderID: "Número de Orden (ID)",
        customerID: "Identificación del cliente",
        status: "Estado:",
        date: "Fecha:",
        time: "Hora:",
        param4Search: "Parámetros de la búsqueda",
        strStatus: {
            all: "Todos los estados", 
            wait: "En espera",
            processing: "Procesando",
            ready: "Listo"
        }
    };

    function MainContainer({paramSelected, changeHandler}){
        //changeHandler (obj)
        //handle when one or two date inputs
        let Inputs = [];
        switch (true){
            case ((paramSelected === "dateAssign" || paramSelected === "dateReceive")):
                Inputs.push(
                    React.createElement(DateTimeInput, {
                        key: paramSelected,
                        id: paramSelected,
                        changeHandler: () =>{}
                    })
                );
            break;

            case (paramSelected === "dateRange"):
                Inputs.push(
                    React.createElement(DateTimeInput, {
                        key: "StartDateInput",
                        id: "StartDateInput",
                        changeHandler: () =>{}
                    }),
                    React.createElement(DateTimeInput, {
                        key: "EndDateInput",
                        id: "EndDateInput",
                        changeHandler: () =>{}
                    }),
                ); 
            break;

            case (paramSelected === "orderID"):
                Inputs.push(
                    React.createElement(TextInput,{
                        id: "orderIDInput",
                        value: value,
                        onChange: () =>{}
                    })
                );
            break;

            case (paramSelected === "customerID"):
                Inputs.push(
                    React.createElement(TextInput,{
                        id: "customerIDInput",
                        value: value,
                        onChange: () =>{}
                    })
                );
            break;
        }

        return [
            React.createElement("div", {
                key: "Col1",
                className: "col-lg-4"
            }, 
                React.createElement(ParamLists, {
                    paramsArr: "",
                    selected: paramSelected,
                    onChange: () =>{}
                })
            ),

            React.createElement("form", {
                className: "col-lg-8 paramBoxStyle"
            },
                React.createElement("fieldset", {
                    className: "border p-2"
                },
                    [
                        React.createElement(SearchOrdersParamComp.Legend4Div, {
                            key: "Legend4Div",
                            text: textEs.param4Search
                        }),
                        React.createElement(SelectStatusInput,{
                            key: "SelectStatusInput",
                            statusArr: "",
                            onChange: () =>{}
                        }),

                    ]
                )            
            )
        ];
    }

    function ParamLists({paramsArr, selected, onChange}){
        //params (array)
        return [
            React.createElement(SearchOrdersParamComp.Label4Input, {
                key: "Lbl4ParamLists",
                id: "SelectParamLists",
                text: textEs.searchBy
            }),
            React.createElement("select", {
                key: "SelectParamLists",
                id: "SelectParamLists",
                value: selected,
                onChange: (e) =>{}
            },
                paramsArr.map(parameter =>{
                    return React.createElement("option", {
                        key: `OptionParamLists${parameter}`,
                        value: parameter
                    }, textEs[parameter]);
                })
            )
        ];
    }

    function SelectStatusInput({statusArr, onChange}){
        //status (array)
        return [
            React.createElement(SearchOrdersParamComp.Label4Input, {
                key: "Lbl4StatusInput",
                id: "SelectStatusInput",
                text: textEs.status
            }),
            React.createElement("select", {
                key: "SelectStatusInput",
                id: "SelectStatusInput",
                onChange: (e) =>{}
            },
                statusArr.map(status =>{
                    return React.createElement("option" ,{
                        key: `OptionStatusInput${status}`,
                        value : status
                    }, textEs.strStatus[status])                    
                })
            )
        ];
    }

    function DateTimeInput({id, changeHandler}){
        //changeHandler (obj with 2 functions)
        
        return React.createElement("div", {className: "container"},
            React.createElement("div",{className: "row"}, 
            [
                React.createElement("div", {key: `DivDate${id}`, className: "col-xs-12"}, 
                    [
                        React.createElement(SearchOrdersParamComp.Label4Input, {
                            key: `LblDate${id}`,
                            id: id,
                            text: textEs.date
                        }),
                        React.createElement(SearchOrdersParamComp.InputDate, {
                            key: `Date4${id}`,
                            id: id,
                            onChange: () =>{}
                        })
                    ]
                ),
                React.createElement("div", {key: `DivTime${id}`,className: "col-xs-12"}, 
                    [
                        React.createElement(SearchOrdersParamComp.Label4Input, {
                            key: `LblTime${id}`,
                            id: id,
                            text: textEs.time
                        }),
                        React.createElement(SearchOrdersParamComp.InputTime, {
                            key: `Time4${id}`,
                            id: id,
                            onChange: () =>{}
                        })
                    ]
                )
            ]
            )
        );
    }

    function TextInput ({id, value , onChange}) {
        return [
            React.createElement("div", null, 
                [
                    React.createElement(SearchOrdersParamComp.Label4Input, {
                        key: `LblText${id}`,
                        id: id
                    }),
                    React.createElement(SearchOrdersParamComp.InputText,{
                        key: `Text${id}`,
                        id: id,
                        value: value,
                        onChange: () =>{}
                    })
                ]
            )
        ]
    }

    return{
      
    };

});
