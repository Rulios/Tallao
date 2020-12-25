const path = require('path');



module.exports = {
    mode: "production",
    entry:{
        design: path.resolve(__dirname, './src/js/design.js'),
        register: path.resolve(__dirname, './src/js/register.js'),
        login: path.resolve(__dirname, './src/js/login.js'),
        laundryPanel: path.resolve(__dirname, "./src/js/laundryPanel.js"),
        myAccount: path.resolve(__dirname, "./src/js/myAccount.js"),
        myOrders: path.resolve(__dirname, "./src/js/myOrders.js"),
        userPanel: path.resolve(__dirname, "./src/js/userPanel.js")
    },
    output: {
        filename: "[name].js",
        path: path.resolve(__dirname, 'public/builds')
    },
    module: {
        rules: [
            {     //tests the file extension to see if we should use the babel-loader.
                test: /\.js$/,
                //including all files in our project src folder
                //include: path.resolve(__dirname, "jsx"),
                /* in case there are any node package dependencies in that src folder 
                we’re use the exclude regular expression to exclude any files within a node_modules sub folder. */
                exclude: /node_modules/,
                //loader that we want to use on these files
                include: path.resolve(__dirname, 'src'),
                loader: "babel-loader"
                /* use: [{
                    loader: "babel-loader",
                    options:{
                        presets: [
                            ["@babel/preset-env", {
                                "targets": "defaults"
                            }],
                            "@babel/preset-react"
                        ]
                    }
                }] */
            }
        ]
    }
};