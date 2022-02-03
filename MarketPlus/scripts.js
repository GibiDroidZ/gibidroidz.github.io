  function copyWallet() {
    /* Get the text field */
    var copyText = document.getElementById("wallet");

    /* Select the text field */
    copyText.select();
    copyText.setSelectionRange(0, 99999); /* For mobile devices */

    /* Copy the text inside the text field */
    navigator.clipboard.writeText(copyText.value);
  }

  // Toggle alert
  $('.alert_trigger').click(function() {
    $('.alert_trigger').addClass('hide');
    $('.change_trigger').addClass('hide');
    $('.alert_content').removeClass('hide');
  });

  $('.alert_dismiss').click(function() {
    $('.alert_trigger').removeClass('hide');
    $('.alert_content').addClass('hide');
    $('.change_trigger').removeClass('hide');
  });

  // Toggle change
  $('.change_trigger').click(function() {
    $('.alert_trigger').addClass('hide');
    $('.change_trigger').addClass('hide');
    $('.change_message').removeClass('hide');
  });

  $('.change_dismiss').click(function() {
    $('.change_trigger').removeClass('hide');
    $('.alert_trigger').removeClass('hide');
    $('.change_message').addClass('hide');
  });



  document.addEventListener('DOMContentLoaded', function() {


    // Set selected from URL
    var j;
    if (race != '') {
      var onURL_Race = [];
      onURL_Race = race.split(',');

      for (j = 0; j < onURL_Race.length; j++) {
        if (onURL_Race[j] == 1) {
          $('#filter_water').prop('checked', true);
        }

        if (onURL_Race[j] == 2) {
          $('#filter_fire').prop('checked', true);
        }

        if (onURL_Race[j] == 3) {
          $('#filter_storm').prop('checked', true);
        }

        if (onURL_Race[j] == 4) {
          $('#filter_rock').prop('checked', true);
        }

        if (onURL_Race[j] == 5) {
          $('#filter_thunder').prop('checked', true);
        }
      }
    }

    if (form != '') {
      var onURL_Form = [];
      onURL_Form = form.split(',');

      for (j = 0; j < onURL_Form.length; j++) {
        if (onURL_Form[j] == 1) {
          $('#filter_egg').prop('checked', true);
        }

        if (onURL_Form[j] == 2) {
          $('#filter_adult').prop('checked', true);
        }
      }
    }

    var delayInMilliseconds = 10;

    setTimeout(function() {
      if (breedCount != '') {
        var onURL_breedCount = [];
        onURL_breedCount = breedCount.split(',');

        $('#filter_breedCount').slider('values', 0, onURL_breedCount[0]);
        $('#filter_breedCount').slider('values', 1, onURL_breedCount[1]);

        $('#slider_bc-min').val(onURL_breedCount[0]);
        $('#slider_bc-max').val(onURL_breedCount[1]);

      }

      if (ce != '') {
        var onURL_CE = [];
        onURL_CE = ce.split(',');

        $('#filter_CE').slider('values', 0, onURL_CE[0]);
        $('#filter_CE').slider('values', 1, onURL_CE[1]);

        $('#slider_CE-min').val(onURL_CE[0]);
        $('#slider_CE-max').val(onURL_CE[1]);

        $('.modal-trigger').click(function() {
          alert();
          //alert($(this).attr('data-target'));
        });
      }
    }, delayInMilliseconds);

    if (sort != '') {
      $('.filter_sort select').val(sort);
    }
  });

  // Parallax Settings
  document.addEventListener("mousemove", parallax);
  const elem = document.querySelector("#parallax");

  function parallax(e) {
    let _w = window.innerWidth / 2;
    let _h = window.innerHeight / 2;
    let _mouseX = e.clientX;
    let _mouseY = e.clientY;
    let _depth1 = `${20 - (_mouseX - _w) * 0.001}% ${20 - (_mouseY - _h) * 0.001}%`;
    let _depth2 = `${20 - (_mouseX - _w) * 0.002}% ${20 - (_mouseY - _h) * 0.002}%`;
    let _depth3 = `${20 - (_mouseX - _w) * 0.003}% ${20 - (_mouseY - _h) * 0.003}%`;
    let x = `${_depth3}, ${_depth2}, ${_depth1}`;
    elem.style.backgroundPosition = x;
  }

  // Fix Slider Issue
  $(function() {
    $("#filter_CE").slider({
      range: true,
      min: 26702,
      max: 49008,
      values: [26702, 49008],
      slide: function(event, ui) {
        $("#slider_CE-min").val(ui.values[0]);
        $("#slider_CE-max").val(ui.values[1]);
      }
    });
    $("#slider_CE-min").val($("#filter_CE").slider("values", 0));
    $("#slider_CE-max").val($("#filter_CE").slider("values", 1));
  });

  $(function() {
    $("#filter_breedCount").slider({
      range: true,
      min: 0,
      max: 7,
      values: [0, 7],
      slide: function(event, ui) {
        $("#slider_bc-min").val(ui.values[0]);
        $("#slider_bc-max").val(ui.values[1]);
      }
    });
    $("#slider_bc-min").val($("#filter_breedCount").slider("values", 0));
    $("#slider_bc-max").val($("#filter_breedCount").slider("values", 1));
  });

  $('#slider_bc-min').change(function() {
    $("#filter_breedCount").slider("values", 0, $(this).val());
  });

  $('#slider_bc-max').change(function() {
    $("#filter_breedCount").slider("values", 1, $(this).val());
  });

  $('#slider_CE-min').change(function() {
    $("#filter_CE").slider("values", 0, $(this).val());
  });

  $('#slider_CE-max').change(function() {
    $("#filter_CE").slider("values", 1, $(this).val());
  });

  var currentPage;

  var URL_race = [];
  var URL_form = [];
  var URL_breedCount = [];
  var URL_CE = [];
  //var URL_sort;
  //var URL_sort = '"sortRole":2,"sortType":1';
  var URL_page = '1';

  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const race = urlParams.get('race') || ''; //1. Water | 2. Fire | 3. Storm | 4. Rock | 5. Thunder
  const form = urlParams.get('form') || ''; //1. Egg | 2. Adult
  const breedCount = urlParams.get('breedCount') || '';
  const ce = urlParams.get('ce') || '';
  var sort = urlParams.get('sort') || '1';
  var sortParam;
  const page = urlParams.get('page') || URL_page;
  returnSort(sort);

  function returnSort(sort) {
    switch (sort) {
      case '1':
        sortParam = '"sortRole":2,"sortType":1';
        break;

      case '2':
        sortParam = '"sortRole":1,"sortType":0';
        break;

      case '3':
        sortParam = '"sortRole":1,"sortType":1';
        break;

      case '4':
        sortParam = '"sortRole":0,"sortType":0';
        break;

      case '5':
        sortParam = '"sortRole":0,"sortType":1';
        break;
      default:

        //return sortParam;
    }
  }

  // Apply filters
  $('.apply_Filter').click(function() {
    if ($('#filter_water').is(":checked"))
      URL_race.push('1');

    if ($('#filter_fire').is(":checked"))
      URL_race.push('2');

    if ($('#filter_storm').is(":checked"))
      URL_race.push('3');

    if ($('#filter_rock').is(":checked"))
      URL_race.push('4');

    if ($('#filter_thunder').is(":checked"))
      URL_race.push('5');

    if ($('#filter_egg').is(":checked"))
      URL_form.push('1');

    if ($('#filter_adult').is(":checked"))
      URL_form.push('2');

    URL_sort = $('.filter_sort select').val();

    URL_breedCount.push($('#slider_bc-min').val());
    URL_breedCount.push($('#slider_bc-max').val());

    URL_CE.push($('#slider_CE-min').val());
    URL_CE.push($('#slider_CE-max').val());

    var new_URL = '';
    new_URL += 'race=' + URL_race;
    new_URL += '&form=' + URL_form;
    new_URL += '&breedCount=' + URL_breedCount;
    new_URL += '&ce=' + URL_CE;
    new_URL += '&sort=' + URL_sort;
    new_URL += '&page=' + URL_page;
    location.href = 'index.html?' + new_URL;
  });

  // Reset Filter
  $('.reset_Filter').click(function() {
    $('#filter_water').prop('checked', false);
    $('#filter_fire').prop('checked', false);
    $('#filter_storm').prop('checked', false);
    $('#filter_rock').prop('checked', false);
    $('#filter_thunder').prop('checked', false);

    $('#filter_egg').prop('checked', false);
    $('#filter_adult').prop('checked', false);

    $('#filter_breedCount').slider('values', 0, '0');
    $('#filter_breedCount').slider('values', 1, '7');
    $('#slider_bc-min').val('0');
    $('#slider_bc-max').val('7');

    $('#filter_CE').slider('values', 0, '26702');
    $('#filter_CE').slider('values', 1, '49008');
    $('#slider_CE-min').val('26702');
    $('#slider_CE-max').val('49008');
  });


  // Races:
  // 1. Water || 2. Fire || 3. Rock || 4. Storm || 5. Thunder
  // Sort Role:
  // 0. General
  //   Sort Type:
  //   0. Lowest ID
  //   1. Highest ID
  // 1. Price
  //   Sort Type:
  //   0. Lowest Price
  //   1. Highest Price
  // 2. Latest

  var query = '{"clazz":[' + race + '],"limit":100,"page":1,"stage":[' + form + '],"saleType":[],' + sortParam + ',"dna":[],"attackArr":[40,88],"defenseArr":[40,88],"healthArr":[40,88],"speedArr":[40,88],"intelligenceArr":[40,88],"ceArr":[' + ce + '],"breedCountArr":[ ' + breedCount + ']}';
  $.ajax({
    type: "POST",
    url: 'https://dragonmainland.io/api/market/product/page',
    dataType: "json",
    data: query,
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    success: function(data) {

      console.log(data.data)
      var product = data.data.list;
      var totalPage = data.data.totalPages;

      var p_no;
      var p_tag, p_tagClass;
      var p_ce;
      var p_bc;
      var p_class;

      var dragon_tag;
      var dragon_type;

      /*for (var h = 1; h <= totalPage; h++) {
        $('.pageListWrap').append('<li class="waves-effect"><a href="#" class="pageList" click="addPageOnURL(' + h + ')">' + h + '</a></li>');
      }*/

      var dragonList = document.getElementById('products');

      $('.totalDragons').text(data.data.total + ' Dragons');
      for (var i = 0; i < product.length; i++) {

        // Get mutation/tag
        switch (product[i].heroVo.mutation) {
          case 0:
            p_tag = '';
            p_tagClass = '';
            break;

          case -2:
            p_tag = 'Negative';
            p_tagClass = 'product_tag-negative';
            break;

          case 2:
            p_tag = 'Rare';
            p_tagClass = 'product_tag-rare';
            break;

          case 4:
            p_tag = 'Mystic';
            p_tagClass = 'product_tag-mystic';
            break;
          default:

        }

        if (product[i].heroVo.father == 0 && product[i].heroVo.mother == 0) {
          p_tag = 'Genesis';
          p_tagClass = 'product_tag-genesis';
        }

        // Get class
        switch (product[i].heroVo.clazz) {
          case 2:
            p_class = 'dragon_type-fire';
            p_eggType = 'dragon-FireDragonEgg';
            break;

          case 1:
            p_class = 'dragon_type-water';
            p_eggType = 'dragon-WaterDragonEgg';
            break;

          case 4:
            p_class = 'dragon_type-storm';
            p_eggType = 'dragon-StormDragonEgg';
            break;

          case 3:
            p_class = 'dragon_type-rock';
            p_eggType = 'dragon-RockDragonEgg';
            break;

          case 5:
            p_class = 'dragon_type-thunder';
            p_eggType = 'dragon-ThunderDragonEgg';
            break;
          default:
        }


        if (product[i].heroVo.status == 1) {
          p_tag = '';
          p_tagClass = '';

          if (product[i].heroVo.father == 0 && product[i].heroVo.mother == 0) {
            p_tag = 'Genesis';
            p_tagClass = 'product_tag-genesis';
          }

          dragonList.innerHTML += '<div class="col l2 m4 s6"><div class="product_item dragon-' + product[i].heroVo.no + ' ' + p_class + 'Hover"><p class="product_no ' + p_class + '"> #' + product[i].heroVo.no + ' </p><p class="product_tag ' + p_tagClass + '"> ' + p_tag + '</p><div data-target="modal1" class="modal-trigger dragon_body dragon_egg"><div class="activator dragon_body-egg ' + p_eggType + '"></div><div class="dragon_body-tail"></div><div class="dragon_body-horn"></div><div class="dragon_body-ear"></div><div class="dragon_body-body"></div><div class="dragon_body-wing"></div><div class="dragon_body-totem"></div><div class="dragon_body-eyes"></div></div><p class="product_price"><a href="https://dragonmainland.io/#/myMainland/myDragonDetail/' + product[i].heroVo.id + '" target="_blank">' + product[i].heroProduct.price + '</a></p></div></div>';

        }

        if (product[i].heroVo.status == 2) {
          dragonList.innerHTML += '<div class="col l2 m4 s6"><div class="product_item dragon-' + product[i].heroVo.no + ' ' + p_class + 'Hover"><p class="product_no ' + p_class + '"> #' + product[i].heroVo.no + ' </p><p class="product_tag ' + p_tagClass + '"> ' + p_tag + '</p><a href="../CheckerPlus/index.html?dragon=' + product[i].heroVo.no +'" target="_blank" class="right"><i class="fa-solid fa-arrow-up-right-from-square"></i></a><div class="display_block"><span class="product_icons"><i class="fas fa-egg"></i>' + product[i].heroVo.breedCount + '</span><span class="product_icons"><i class="fas fa-dumbbell"></i>' + product[i].heroVo.ce + '</span></div><span class="product_icons"><i class="fas fa-heart"></i>' + product[i].heroVo.health + '</span><span class="product_icons"><i class="fas fa-sword"></i>' + product[i].heroVo.attack + '</span><span class="product_icons"><i class="fas fa-shield"></i>' + product[i].heroVo.defend + '</span><span class="product_icons"><i class="fas fa-boot"></i>' + product[i].heroVo.speed + '</span><span class="product_icons"><i class="fas fa-fire"></i>' + product[i].heroVo.intellect + '</span><div data-target="modal1" class="modal-trigger dragon_body" data-target="modal1" class="btn modal-trigger"><div class="dragon_body-tail"></div><div class="dragon_body-horn"></div><div class="dragon_body-ear"></div><div class="dragon_body-body"></div><div class="dragon_body-wing"></div><div class="dragon_body-totem"></div><div class="dragon_body-eyes"></div></div><p class="product_price"><a href="https://dragonmainland.io/#/myMainland/myDragonDetail/' + product[i].heroVo.id + '" target="_blank"><img src="assets/DMS_Logo.png" />' + product[i].heroProduct.price + '</a></p></div></div>';
        }

        $(".dragon-" + product[i].heroVo.no + " .dragon_body-eyes").attr("class", 'activator dragon_body-eyes dragon-' + product[i].heroVo.parts[0].dnaNameEn.replace(/\s/g, ''));
        $(".dragon-" + product[i].heroVo.no + " .dragon_body-totem").attr("class", 'activator dragon_body-totem dragon-' + product[i].heroVo.parts[1].dnaNameEn.replace(/\s/g, ''));
        $(".dragon-" + product[i].heroVo.no + " .dragon_body-horn").attr("class", 'activator dragon_body-horn dragon-' + product[i].heroVo.parts[2].dnaNameEn.replace(/\s/g, ''));
        $(".dragon-" + product[i].heroVo.no + " .dragon_body-ear").attr("class", 'activator dragon_body-ear dragon-' + product[i].heroVo.parts[3].dnaNameEn.replace(/\s/g, ''));
        $(".dragon-" + product[i].heroVo.no + " .dragon_body-wing").attr("class", 'activator dragon_body-wing dragon-' + product[i].heroVo.parts[4].dnaNameEn.replace(/\s/g, ''));
        $(".dragon-" + product[i].heroVo.no + " .dragon_body-tail").attr("class", 'activator dragon_body-tail dragon-' + product[i].heroVo.parts[5].dnaNameEn.replace(/\s/g, ''));
        $(".dragon-" + product[i].heroVo.no + " .dragon_body-body").attr("class", 'activator dragon_body-body dragon-' + product[i].heroVo.parts[6].dnaNameEn.replace(/\s/g, ''));
      }

    }
  });
