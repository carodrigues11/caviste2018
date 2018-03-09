/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function reportError(message, type='secondary'){
   
    $('#toolbar .alert').html(message);
    
    switch(type) {
        case 'error': 
            $('#toolbar .alert').addClass('alert-danger'); break;
        case 'success':
            $('#toolbar .alert').addClass('alert-success'); break;
        default:
            $('#toolbar .alert').addClass('alert-secondary'); break;
    }
}


function removeError(){
   
    $('#toolbar .alert').html('');
    $('#toolbar .alert').removeClass().addClass('alert');
    
}


$(document).ready(function(){
    const API_URL = 'http://caviste.localhost/api';
    
    //initialistation
    
    $('#liste').empty();
    
    $.get(API_URL + '/wines',function(data){
        vins = JSON.parse(data);
        
        $.each(vins, function(key,vin){
            $('#liste').append('<li class="list-group-item">'+vin.name+'</li>');
        });
        
    }).fail(function(){
        reportError('Désolé, service indisponible','error');
    });
    
    
    //Gestion de commande
    
    $('input[name=search]').on('keypress',function(){
        if(event.keyCode == 13){
            $('#btSearch').click();
        }
        
        
    });
    
    
    $('#btSearch').on('click', function(){
        removeError();
        let keyword = $('form#frmSearch input[name=search]').val();
        
        if(keyword && keyword.trim() != ''){
        
            $.get(API_URL + '/wines/search/'+keyword,function(data){
                vins = JSON.parse(data);

                //vider la liste
                $('#liste').empty();

                $.each(vins, function(key,vin){
                    $('#liste').append('<li class="list-group-item">'+vin.name+'</li>');  
                });    
            }).fail(function(){
                reportError('Désolé, le recherche n est pas disponible','error');

            });
        }else{
           reportError('Veuillez entrer un mot-clé','error');
        }
        //Annuler l'envoi du formulaire
        event.preventDefault();
        return false;
    });
    
});