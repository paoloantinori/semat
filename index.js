var cm = require("sdk/context-menu");

// represent our leaves in the menu
function Entry(label){ 
  this.label = label;
  this.data = label;
  this.context =  cm.SelectorContext("textarea, div, input");
  this.contentScriptFile = "./content-script.js";
  this.contentScriptWhen = "end";

}

// represents a submenu
function SubMenu(label, arrEntries){
  this.label = label;
  this.context =  cm.SelectorContext("textarea, div, input");
  this.items = function(arr){
    var items = [];
    for( id in arr){    
      items.push( cm.Item( new Entry(arr[id]) ) );
    }
    return items;
  }(arrEntries);
} 

cm.Menu({
  label: "SEMAT",
  items: [ 
  cm.Menu( new SubMenu("Way of Working", ["Principles Established", "Foundation Established", "In Use"]) ),
  cm.Menu( new SubMenu("Team", ["Seeded", "Formed", "Collaborating"]) ),
  ],
  context: cm.SelectorContext("textarea, div, input")
});