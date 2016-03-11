var elements = document.getElementsByTagName('*');

var wordsToReplace = [
    ['am|is|are', 'be'],
    ['Am|Is|Are', 'Be'],
    ['was|were', 'been'],
    ['Was|Were', 'Been']
];

for(var i = 0; i < elements.length; i++){
    var element = elements[i];

    if(element.tagName !== "SCRIPT" && element.tagName !== "STYLE"){
        for(var j = 0; j < element.childNodes.length; j++){
            var node = element.childNodes[j];

            if(node.nodeType === 3){
                var text = node.nodeValue;
                var replacedText = text;
                for(var k = 0; k < wordsToReplace.length; k++){
                    var wordToReplace = wordsToReplace[k];
                    replacedText = replacedText
                        .replace(new RegExp('([^A-Za-z])+(' + wordToReplace[0] + ')([^A-Za-z])+', 'g'), '$1' + wordToReplace[1] + '$3')
                        .replace(new RegExp('^(' + wordToReplace[0] + ')([^A-Za-z])+', 'g'), wordToReplace[1] + '$2')
                        .replace(new RegExp('([^A-Za-z])+(' + wordToReplace[0] + ')$', 'g'), '$1' + wordToReplace[1])
                        .replace(new RegExp('^(' + wordToReplace[0] + ')$', 'g'), wordToReplace[1]);
                }
                if(replacedText !== text){
                    element.replaceChild(document.createTextNode(replacedText), node);
                }
            }
        }
    }
}