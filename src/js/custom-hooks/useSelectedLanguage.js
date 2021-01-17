const {useState, useEffect} = require("react");
const {getLanguage, setLanguage} = require("../../../translation/frontend/language-config");

function useSelectedLanguage(){
    let [selectedLanguage, setSelectedLanguage] = useState(getLanguage());
    let [isFirstTimeGettingSelectedLanguage, setFirstTime] = useState(true);

    useEffect(() => {

        if(isFirstTimeGettingSelectedLanguage){
            setFirstTime(false);
        }else{
            setLanguage(selectedLanguage);

            //reload the page
            location.reload();
        }   

    }, [selectedLanguage]);


    return [selectedLanguage, setSelectedLanguage];

}

module.exports = useSelectedLanguage;