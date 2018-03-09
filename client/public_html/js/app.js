/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


$(document).ready(function(){
    const API_URL = 'http://caviste.localhost/api';
    
    //initialistation
    
    $('#liste').empty();
    
    jQuery.get(API_URL + '/wines',function(data){
        vins = JSON.parse(data);
        
        $.each(vins, function(key,vin){
            $('#liste').append('<li class="list-group-item">'+vin.name+'</li>');
        });
        
    }).fail(function(){
        let notification = '<div class="alert alert-danger" role="alert">Désolé, service indosponible</div>';
        
        $('#toolbar').append(notification);
        
    });
    
    
    //Gestion de commande
    $('#btSearch').on('click', function(){
        
        let keyword = $('form#fmrSearch input[name=search]').val();
        
        $.get(API_URL + '/wines',function(data){
        vins = JSON.parse(data);
        
        $.each(vins, function(key,vin){
            $('#liste').append('<li class="list-group-item">'+vin.name+'</li>');
        });
        
        }).fail(function(){
            let notification = '<div class="alert alert-danger" role="alert">Désolé, service indosponible</div>';

        $('#toolbar').append(notification);
        
    });
        
        
    });
    
});