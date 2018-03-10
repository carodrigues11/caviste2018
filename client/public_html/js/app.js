/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
const API_URL = 'http://caviste.localhost/api';

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




function showWines() {
    //initialistation
   
    $('#liste').empty();
    
    $.get(API_URL + '/wines',function(data){
        vins = JSON.parse(data);
        
        $.each(vins, function(key,vin){
            $('#liste').append('<li class="list-group-item" data-id="'+vin.id+'">'+vin.name+'</li>');
        });
        
        
        
        $('#liste li').on('click', function(){
            let idWine = $(this).data('id');
            

            $.get(API_URL + '/wines/'+idWine, function(data){
                let vin = JSON.parse(data);
                
                fillForm(vin);
                
                console.log(vin);
            }).fail(function(){
                reportError('Désolé, vin indisponible','error');

            });

        });
    
        
        
    }).fail(function(){
        reportError('Désolé, service indisponible','error');
    });
}


function fillForm(vin, idForm){
    $('#frmWine #idWine').val(vin.id);
    $('#frmWine #nameWine').val(vin.name);
    $('#frmWine #grapesWine').val(vin.grapes);
    $('#frmWine #countryWine').val(vin.country);
    $('#frmWine #regionWine').val(vin.region);
    $('#frmWine #yearWine').val(vin.year);
    $('#frmWine #notes').val(vin.description);
    $('#frmWine figure img').attr('src','pictures/'+vin.picture);
    $('#frmWine figure figcaption').html(vin.name);
}

function clearForm(){
    $('#frmWine #idWine').val('');
    $('#frmWine #nameWine').val('');
    $('#frmWine #grapesWine').val('');
    $('#frmWine #countryWine').val('');
    $('#frmWine #regionWine').val('');
    $('#frmWine #yearWine').val('');
    $('#frmWine #notes').val('');
    $('#frmWine figure img').attr('src','pictures/wine1.jpg');
    $('#frmWine figure figcaption').html('');
    
    $('#frmWine #nameWine').focus();

}


$(document).ready(function(){
    
    
    showWines();
    
    
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
                    $('#liste').append('<li class="list-group-item" data-id="'+vin.id+'">'+vin.name+'</li>');  
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
    
    //Voir tous les vins
     $('#btAllWines').on('click', function(){
        //Retirer la notifiction d'erreur
        removeError()
         
        //Vider le champ de recherche
        $('input[name=search]').val('');
        
        //Afficher la liste
        showWines();
     });
    
        //Voir tous les vins
     $('#btNewWine').on('click', function(){
        //Retirer la notifiction d'erreur
        removeError()
       
        clearForm();
     });
    
    
});