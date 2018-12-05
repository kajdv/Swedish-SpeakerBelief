// This tells Ibex you will send the results early
var manualSendResults = true;
var showProgressBar = true;
var shuffleSequence = seq("setcounter","consent","instructions","distract",randomize("Practice"),randomize("experiment"),"send","prolificConf");
PennController.ResetPrefix(null);


var items = [

    ["setcounter", "__SetCounter__", { } ]
    ,    
    ["consent", "PennController", PennController(
        newHtml("consent", "ProlificConsent.html")
            .settings.log()
            .print()
        ,
        newButton("consent btn", "Jag g&aring;r med p&aring; att delta i denna studie.")
            .print()
            .wait( getHtml("consent").test.complete().failure( getHtml("consent").warn() ) )
    )]
    ,
    ["instructions", "PennController", PennController(
        newHtml("instructions form", "TaskInstructions-Sp-belief.html")
            .print()
        ,
        newButton("continue btn", "Klicka h&auml;r f&ouml;r att g&aring; vidare.")
            .print()
            .wait()
    )]
     ,
    //["scaleinstr", "PennController", PennController(
    //    newHtml("scale form", "Scale.html")
     //       .print()
     //   ,
     //   newButton("continue btn", "G&aring; vidare.")  
      //      .print()
       //     .wait( getHtml("scale form").test.complete().failure(getHtml("scale form").warn()) )
   // )]
    //,     
    ["distract", "PennController", PennController(
        newHtml("distract form", "DistractionsOff.html")
            .print()
        ,
        newButton("continue btn", "G&aring; vidare.")
            .print()
            .wait( getHtml("distract form").test.complete().failure(getHtml("distract form").warn()) )
    )] 
    ,      
    //["feedback", "PennController", PennController(
     //   newHtml("feedback form", "ProlificFeedback.html")
      //      .settings.log()
      //      .print()
      //  ,
      //  newButton("continue to confirm", "Klicken Sie hier, um fortzufahren.")
      //      .settings.bold()
       //     .print()
       //     .wait( getHtml("feedback form").test.complete().failure(getHtml("feedback form").warn()) )              
   // )]
    //,      
    ["send", "__SendResults__", { }]   
    ,
    ["prolificConf", "PennController", PennController(
        newHtml("thanks", "ProlificConfirmation.html")
            .settings.log()
            .print() 
        ,
        newButton("continue btn", "Jag &auml;r klar.")
            .settings.bold()
     //       .print()
            .wait()                 
    )]                     
];

//PennController.GetTable( "SW-datasource-Sp_bel.csv" ).setLabel("Expt");

PennController.FeedItems( PennController.GetTable( "SW-datasource-Sp_bel.csv" ).setLabel("Expt"),//.filter("Expt","experiment"),
    (item) => PennController(
        newTimer("blank", 1000)
            .start()
            .wait()
        ,    
        newTooltip("instructions", "Klicka p&aring; mellanslagstangenten f&ouml;r att forts&auml;tta.")
            .settings.size(180, 25)
            .settings.position("bottom center")
            .settings.key(" ", "no click")
        ,
        newCanvas("stimbox", 850, 190)
            .settings.add(25,40,
                newText("context", item.Background)
                    .settings.size(700, 30)
            )
            .settings.add(25, 85,
                newText("context", item.Says)
                    .settings.size(700, 30)
            )               
            .settings.add(25,130,
                newText("stimuli", item.Stims)
                    .settings.italic()
                    .settings.size(700, 30)                  
            )
            .print()
        ,
        newTimer("transit", 1000)
            .start()
            .wait()
        ,   
        newScale("answer", 9)
            .settings.log()
        ,
        newCanvas("answerbox", 850, 150)
            .settings.add(25,40, newText("claim", item.Claim).settings.size(700, 30) )
            .settings.add(25,85, newText("labelLeft", "St&auml;mmer inte").settings.bold() )
            .settings.add(120,80, getScale("answer").settings.size(200, 0) )
            .settings.add(355,83, newText("labeRight", "St&auml;mmer").settings.bold() )
            .settings.add(208,105, newText("labelMid", "Kanske").settings.bold() )            
            .print()      
        ,
        newText("warning","Var god v&auml;lj ett svar.")
            .settings.hidden()
            .settings.color("red")
            .settings.bold()
            .settings.css("margin-left", 50 )
            .print()
        ,
        newButton("validate", "N&auml;sta fr&aring;ga")
            .settings.center() 
            .print()    
            .wait(getScale("answer")
                  .test.selected()
                  .failure(getText("warning")
                           .settings.visible()
                          )
                 )              

    ).log("Expt", item.Expt)
    .log("ExptType", item.ExptType)
    .log("ItemName", item.ItemName)
    .log("Tense", item.Tense)
    .log("polarity", item.polarity)
    .log("EmbPred", item.EmbPred)
    .log("lemma", item.lemma)
    .log("Group", item.Group)
    .log("Item", item.Item)
    .log("NoExpt", item.NoExpt)
    .log("EmbCondition", item.EmbCondition)
    .log("mcpred", item.mcpred)  
 //   .log("Stims", item.Stims)  
    .log("source", PennController.GetURLParameter("source"))   
    .log("PROLIFIC_PID", PennController.GetURLParameter("PROLIFIC_PID")) 
);





