var geneJam = {}

function mygene_info_gene_query(query){
    var animalName = $('#geneSelect2').find(':selected').text();
    var gene_query_url = 'http://mygene.info/v2/query';
    var url = gene_query_url + "?species=" +animalName+ "&limit=100&callback=?&q="+query;
    $.getJSON(url, mygene_info_gene_query_callback);
}

function mygene_info_gene_query_callback(result){
    var animalName = $('#geneSelect2').find(':selected').text();
    var html;
    $("#mygene_info_gene_query_result").empty();
    if ($.isArray(result.hits)){
        html = '<p>Found '+result.total+' matched ' +animalName+ ' gene(s).</p>';
        if (result.total > 0){
            html += '<table>';
            $.each(result.hits, function(i, gene){
                html += '<tr><td><a href="javascript:showgene(\'' + gene._id + '\');">' + gene.symbol + '</a></td><td>'+ gene.name + '</td></tr>';
            });
            html += '</table>';
        }
    }
    else {
        var err = result.error || result.reason || "Invalid query!";
        html = '<p>Error:<pre>&nbsp;'+err+'</pre></p>';
    }

    $("#mygene_info_gene_query_result").append(html);
}

function showgene(geneid){
    var gene_url = 'http://mygene.info/v2/gene/'+geneid+'?fields=reporter&callback=?';
    show_loading("#mygene_info_gene_datachart");
    $.getJSON(gene_url, mygene_info_get_gene_callback);
}

function mygene_info_get_gene_callback(result){
    $("#mygene_info_gene_datachart").empty();
    if (result && result.reporter && result.reporter['Mouse430_2']){
        var ps_list = result.reporter['Mouse430_2'];
        if (!$.isArray(ps_list)){
            ps_list = [ps_list];
        }
        $.each(ps_list, function(i, ps){
            $("#mygene_info_gene_datachart").append('<img src="http://biogps.org/dataset/4/chart/'+ps+'" />');
        });
    }
    else {
        $("#mygene_info_gene_datachart").append('<p>No data available for this gene.</p>');
    }
}

function show_loading(el){
  $(el).empty();
  $(el).append('<img src="img/loading.gif">');
}

$(document).ready(function(){
 $("#mygene_info_gene_query_form").submit(function(){
  var query = $("#mygene_info_gene_query_form input[name=query]").val();
  if (query) {
    mygene_info_gene_query(query);
    show_loading("#mygene_info_gene_query_result");
  }
  return false;
 });
});

//

var compareGene = {};

var animalName = $('#geneSelect3').find(':selected').text();
var query = $("#mygene_info_gene_query_form input[name=query]").val();
var percent = Math.floor(Math.random()*61);

compareGene.init = function(){
    $('#compare').on('click', function(){       
    // }
    // compareGene.getGenes('human');
    // $('#geneSelect3').on('change',function(){
        var animal = $('#geneSelect3').find(':selected').text();
        // var animal = $(this).val();
        compareGene.getGenesUno(animal);
        compareGene.getGenesDos(animal);
         $('#comparatron').html(''+percent+' % match');
        // var animalName = $(this).find(':selected').text();
        // compareGene.updateTitle(animalName);
    });
};


compareGene.getGenesUno = function(query){
    var query = $("#mygene_info_gene_query_form input[name=query]").val();
    var animalName = $('#geneSelect2').find(':selected').text();
    $.ajax({
        url: 'http://mygene.info/v2/query?species=' +animalName+ '&limit=100&callback=?&q='+query,
        type: 'GET',
        dataType: 'jsonp',
        success: function(result1){
            //geneJam.displayGenes(result.)
            var result1 = result1.hits;
            console.log(result1);
        }
    });
};

compareGene.getGenesDos = function(query){
    var query = $("#mygene_info_gene_query_form input[name=query]").val();
    var animalName = $('#geneSelect3').find(':selected').text();
    $.ajax({
        url: 'http://mygene.info/v2/query?species=' +animalName+ '&limit=100&callback=?&q='+query,
        type: 'GET',
        dataType: 'jsonp',
        success: function(result2){
            //geneJam.displayGenes(result.)
            var result2 = (result2.hits);
            console.log(result2);
        }
    });
};


$(function(){
    compareGene.init();
});


