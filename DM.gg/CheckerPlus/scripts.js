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

function copyWallet() {
  /* Get the text field */
  var copyText = document.getElementById("wallet");

  /* Select the text field */
  copyText.select();
  copyText.setSelectionRange(0, 99999); /* For mobile devices */

  /* Copy the text inside the text field */
  navigator.clipboard.writeText(copyText.value);
}

// Materialize Initialization
var elems = document.querySelectorAll('.tooltipped');
var instances = M.Tooltip.init(elems, {});

var elems = document.querySelectorAll('.sidenav');
var instances = M.Sidenav.init(elems, {});

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

// Process input
$(".getInput").click(function() {
  var inputData = '{"no":"' + $(".dragonNo").val() + '"}';
  //var inputData = '{"no":"21887"}';
  retrieveDragon(inputData);
  var newURL = 'index.html?dragon=' + $(".dragonNo").val();
  window.history.replaceState(null, null, newURL );
});

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const dragon = urlParams.get('dragon') || '';

var inputData = '{"no":"' + dragon + '"}';
retrieveDragon(inputData);

function retrieveDragon(inputData) {
  $.ajax({
    type: "POST",
    url: 'https://dragonmainland.io/api/game/hero/getHeroDetailByNo',
    dataType: "json",
    data: inputData,
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    success: function(data) {

      var dragons = data;
      var marketLink = 'https://dragonmainland.io/#/myMainland/myDragonDetail/';
      console.log(dragons.data);

      $(".dragon_number").html('#' + dragons.data.no);
      $(".link-out").attr('href', marketLink + dragons.data.id);

      if (dragons.data.clazz == 2) {
        $(".dragon_number").removeClass().addClass('dragon_number dragon_type-fire');
        $(".dragon_body").removeClass().addClass('dragon_body dragon_card-contentFire');
      }

      if (dragons.data.clazz == 1) {
        $(".dragon_number").removeClass().addClass('dragon_number dragon_type-water');
        $(".dragon_body").removeClass().addClass('dragon_body dragon_card-contentWater');
      }

      if (dragons.data.clazz == 3) {
        $(".dragon_number").removeClass().addClass('dragon_number dragon_type-rock');
        $(".dragon_body").removeClass().addClass('dragon_body dragon_card-contentRock');
      }

      if (dragons.data.clazz == 4) {
        $(".dragon_number").removeClass().addClass('dragon_number dragon_type-storm');
        $(".dragon_body").removeClass().addClass('dragon_body dragon_card-contentStorm');
      }

      if (dragons.data.clazz == 5) {
        $(".dragon_number").removeClass().addClass('dragon_number dragon_type-thunder');
        $(".dragon_body").removeClass().addClass('dragon_body dragon_card-contentThunder');
      }

      if (dragons.data.mutation == 0) {
        $(".dragon_tag").removeClass().addClass('dragon_tag hide');
      }

      if (dragons.data.mutation == -2) {
        $(".dragon_tag").html('Negative');
        $(".dragon_tag").removeClass().addClass('dragon_tag dragon_tab-negative');
      }

      if (dragons.data.mutation == 2) {
        $(".dragon_tag").html('Rare');
        $(".dragon_tag").removeClass().addClass('dragon_tag dragon_tab-rare');
      }

      if (dragons.data.mutation == 4) {
        $(".dragon_tag").html('Mystic');
        $(".dragon_tag").removeClass().addClass('dragon_tag dragon_tab-mystic');
      }

      if (dragons.data.mother == 0 && dragons.data.father == 0) {
        $(".dragon_tag").html('Genesis');
        $(".dragon_tag").removeClass().addClass('dragon_tag dragon_tab-genesis');
      }

      if (dragons.data.status == 1) {
        if (dragons.data.clazz == 2) {
          $(".dragon_body-egg").removeClass().addClass('dragon_body-egg dragon-FireDragonEgg');
        }

        if (dragons.data.clazz == 1) {
          $(".dragon_body-egg").removeClass().addClass('dragon_body-egg dragon-WaterDragonEgg');
        }

        if (dragons.data.clazz == 3) {
          $(".dragon_body-egg").removeClass().addClass('dragon_body-egg dragon-RockDragonEgg');
        }

        if (dragons.data.clazz == 4) {
          $(".dragon_body-egg").removeClass().addClass('dragon_body-egg dragon-StormDragonEgg');
        }

        if (dragons.data.clazz == 5) {
          $(".dragon_body-egg").removeClass().addClass('dragon_body-egg dragon-ThunderDragonEgg');
        }
      }

      if (dragons.data.status != 1) {

        $(".dragon_body-egg").addClass('hide');
      }

      $(".dragon_breedCount").html(dragons.data.breedCount);
      $(".dragon_boneCount").html(dragons.data.boneCount);
      $(".dragon_level").html(dragons.data.level);
      $(".dragon_ce").html(dragons.data.ce);

      $(".dragon_health").html(dragons.data.health);
      $(".dragon_attack").html(dragons.data.attack);
      $(".dragon_defense").html(dragons.data.defend);
      $(".dragon_speed").html(dragons.data.speed);
      $(".dragon_lifeForce").html(dragons.data.intellect);

      $(".dragon_parts-eye").html(dragons.data.parts[0].dnaNameEn);
      $(".dragon_parts-totem").html(dragons.data.parts[1].dnaNameEn);
      $(".dragon_parts-horn").html(dragons.data.parts[2].dnaNameEn);
      $(".dragon_parts-ear").html(dragons.data.parts[3].dnaNameEn);
      $(".dragon_parts-wing").html(dragons.data.parts[4].dnaNameEn);
      $(".dragon_parts-tail").html(dragons.data.parts[5].dnaNameEn);

      $(".dragon_body-eyes").attr("class", 'activator dragon_body-eyes dragon-' + dragons.data.parts[0].dnaNameEn.replace(/\s/g, ''));
      $(".dragon_body-totem").attr("class", 'activator dragon_body-totem dragon-' + dragons.data.parts[1].dnaNameEn.replace(/\s/g, ''));
      $(".dragon_body-horn").attr("class", 'activator dragon_body-horn dragon-' + dragons.data.parts[2].dnaNameEn.replace(/\s/g, ''));
      $(".dragon_body-ear").attr("class", 'activator dragon_body-ear dragon-' + dragons.data.parts[3].dnaNameEn.replace(/\s/g, ''));
      $(".dragon_body-wing").attr("class", 'activator dragon_body-wing dragon-' + dragons.data.parts[4].dnaNameEn.replace(/\s/g, ''));
      $(".dragon_body-tail").attr("class", 'activator dragon_body-tail dragon-' + dragons.data.parts[5].dnaNameEn.replace(/\s/g, ''));
      $(".dragon_body-body").attr("class", 'activator dragon_body-body dragon-' + dragons.data.parts[6].dnaNameEn.replace(/\s/g, ''));

      $(".dragon_skill1").html(dragons.data.skillNo1.name);
      $(".dragon_skill1-energy").html(dragons.data.skillNo1.energy);
      $(".dragon_skill1-description").html(dragons.data.skillNo1.des);
      $(".dragon_skill1-damage").html(dragons.data.skillNo1.damage);
      $(".dragon_skill1-shield").html(dragons.data.skillNo1.shield);
      $(".dragon_skill1-level").html(dragons.data.skillNo1.level - 1 + ' ⇧');
      $(".dragon_skill-part1").html(dragons.data.parts[2].dnaNameEn);

      $(".dragon_skill2").html(dragons.data.skillNo2.name);
      $(".dragon_skill2-energy").html(dragons.data.skillNo2.energy);
      $(".dragon_skill2-description").html(dragons.data.skillNo2.des);
      $(".dragon_skill2-damage").html(dragons.data.skillNo2.damage);
      $(".dragon_skill2-shield").html(dragons.data.skillNo2.shield);
      $(".dragon_skill2-level").html(dragons.data.skillNo2.level - 1 + ' ⇧');
      $(".dragon_skill-part2").html(dragons.data.parts[3].dnaNameEn);

      $(".dragon_skill3").html(dragons.data.skillNo3.name);
      $(".dragon_skill3-energy").html(dragons.data.skillNo3.energy);
      $(".dragon_skill3-description").html(dragons.data.skillNo3.des);
      $(".dragon_skill3-damage").html(dragons.data.skillNo3.damage);
      $(".dragon_skill3-shield").html(dragons.data.skillNo3.shield);
      $(".dragon_skill3-level").html(dragons.data.skillNo3.level - 1 + ' ⇧');
      $(".dragon_skill-part3").html(dragons.data.parts[4].dnaNameEn);

      $(".dragon_skill4").html(dragons.data.skillNo4.name);
      $(".dragon_skill4-energy").html(dragons.data.skillNo4.energy);
      $(".dragon_skill4-description").html(dragons.data.skillNo4.des);
      $(".dragon_skill4-damage").html(dragons.data.skillNo4.damage);
      $(".dragon_skill4-shield").html(dragons.data.skillNo4.shield);
      $(".dragon_skill4-level").html(dragons.data.skillNo4.level - 1 + ' ⇧');
      $(".dragon_skill-part4").html(dragons.data.parts[5].dnaNameEn);


      switch (dragons.data.skillNo1.clazz) {
        case 1:
          $(".dragon_card-content1").removeClass().addClass('card-content dragon_card-content1 dragon_card-contentWater');
          $(".dragon_skill1-type").removeClass().addClass('dragon_skill1-type dragon_skill1-typeWater');
          break;

        case 2:
          $(".dragon_card-content1").removeClass().addClass('card-content dragon_card-content1 dragon_card-contentFire');
          $(".dragon_skill1-type").removeClass().addClass('dragon_skill1-type dragon_skill1-typeFire');
          break;

        case 4:
          $(".dragon_card-content1").removeClass().addClass('card-content dragon_card-content1 dragon_card-contentStorm');
          $(".dragon_skill1-type").removeClass().addClass('dragon_skill1-type dragon_skill1-typeStorm');
          break;

        case 3:
          $(".dragon_card-content1").removeClass().addClass('card-content dragon_card-content1 dragon_card-contentRock');
          $(".dragon_skill1-type").removeClass().addClass('dragon_skill1-type dragon_skill1-typeRock');
          break;

        case 5:
          $(".dragon_card-content1").removeClass().addClass('card-content dragon_card-content1 dragon_card-contentThunder');
          $(".dragon_skill1-type").removeClass().addClass('dragon_skill1-type dragon_skill1-typeThunder');
          break;

        default:
      }

      switch (dragons.data.skillNo2.clazz) {
        case 1:
          $(".dragon_card-content2").removeClass().addClass('card-content dragon_card-content2 dragon_card-contentWater');
          $(".dragon_skill2-type").removeClass().addClass('dragon_skill2-type dragon_skill2-typeWater');
          break;

        case 2:
          $(".dragon_card-content2").removeClass().addClass('card-content dragon_card-content2 dragon_card-contentFire');
          $(".dragon_skill2-type").removeClass().addClass('dragon_skill2-type dragon_skill2-typeFire');
          break;

        case 4:
          $(".dragon_card-content2").removeClass().addClass('card-content dragon_card-content2 dragon_card-contentStorm');
          $(".dragon_skill2-type").removeClass().addClass('dragon_skill2-type dragon_skill2-typeStorm');
          break;

        case 3:
          $(".dragon_card-content2").removeClass().addClass('card-content dragon_card-content2 dragon_card-contentRock');
          $(".dragon_skill2-type").removeClass().addClass('dragon_skill2-type dragon_skill2-typeRock');
          break;

        case 5:
          $(".dragon_card-content2").removeClass().addClass('card-content dragon_card-content2 dragon_card-contentThunder');
          $(".dragon_skill2-type").removeClass().addClass('dragon_skill2-type dragon_skill2-typeThunder');
          break;

        default:
      }

      switch (dragons.data.skillNo3.clazz) {
        case 1:
          $(".dragon_card-content3").removeClass().addClass('card-content dragon_card-content3 dragon_card-contentWater');
          $(".dragon_skill3-type").removeClass().addClass('dragon_skill3-type dragon_skill3-typeWater');
          break;

        case 2:
          $(".dragon_card-content3").removeClass().addClass('card-content dragon_card-content3 dragon_card-contentFire');
          $(".dragon_skill3-type").removeClass().addClass('dragon_skill3-type dragon_skill3-typeFire');
          break;

        case 4:
          $(".dragon_card-content3").removeClass().addClass('card-content dragon_card-content3 dragon_card-contentStorm');
          $(".dragon_skill3-type").removeClass().addClass('dragon_skill3-type dragon_skill3-typeStorm');
          break;

        case 3:
          $(".dragon_card-content3").removeClass().addClass('card-content dragon_card-content3 dragon_card-contentRock');
          $(".dragon_skill3-type").removeClass().addClass('dragon_skill3-type dragon_skill3-typeRock');
          break;

        case 5:
          $(".dragon_card-content3").removeClass().addClass('card-content dragon_card-content3 dragon_card-contentThunder');
          $(".dragon_skill3-type").removeClass().addClass('dragon_skill3-type dragon_skill3-typeThunder');
          break;

        default:
      }

      switch (dragons.data.skillNo4.clazz) {
        case 1:
          $(".dragon_card-content4").removeClass().addClass('card-content dragon_card-content4 dragon_card-contentWater');
          $(".dragon_skill4-type").removeClass().addClass('dragon_skill4-type dragon_skill4-typeWater');
          break;

        case 2:
          $(".dragon_card-content4").removeClass().addClass('card-content dragon_card-content4 dragon_card-contentFire');
          $(".dragon_skill4-type").removeClass().addClass('dragon_skill4-type dragon_skill4-typeFire');
          break;

        case 4:
          $(".dragon_card-content4").removeClass().addClass('card-content dragon_card-content4 dragon_card-contentStorm');
          $(".dragon_skill4-type").removeClass().addClass('dragon_skill4-type dragon_skill4-typeStorm');
          break;

        case 3:
          $(".dragon_card-content4").removeClass().addClass('card-content dragon_card-content4 dragon_card-contentRock');
          $(".dragon_skill4-type").removeClass().addClass('dragon_skill4-type dragon_skill4-typeRock');
          break;

        case 5:
          $(".dragon_card-content4").removeClass().addClass('card-content dragon_card-content4 dragon_card-contentThunder');
          $(".dragon_skill4-type").removeClass().addClass('dragon_skill4-type dragon_skill4-typeThunder');
          break;

        default:
      }

      /*

            switch (dragons.data.skillNo1.name) {

              case 'Recovery':
                $(".dragon_skill1-image").attr("src", "");

                break;

              case 'Toxic Stinger':
                $(".dragon_skill1-image").attr("src", "");

                break;

              case 'Toxic Surface':
                $(".dragon_skill1-image").attr("src", "");

                break;

              case 'Vampire':
                $(".dragon_skill1-image").attr("src", "");

                break;

              case 'Banned Horns':
                $(".dragon_skill1-image").attr("src", "");

                break;

              case 'Life Horn':
                $(".dragon_skill1-image").attr("src", "");

                break;

              case 'Healing Water':
                $(".dragon_skill1-image").attr("src", "");

                break;

              case 'Water Blessing':
                $(".dragon_skill1-image").attr("src", "");

                break;

              case 'Therapist':
                $(".dragon_skill1-image").attr("src", "");

                break;

              case 'Damage Tool':
                $(".dragon_skill1-image").attr("src", "");

                break;

              case 'Purifier':
                $(".dragon_skill1-image").attr("src", "");

                break;

              case 'Water Power':
                $(".dragon_skill1-image").attr("src", "");

                break;

              case 'Flame-sucker':
                $(".dragon_skill1-image").attr("src", "");

                break;

              case 'Firefighter':
                $(".dragon_skill1-image").attr("src", "");

                break;

              case 'Dispel':
                $(".dragon_skill1-image").attr("src", "");

                break;

              case 'Life Fountain':
                $(".dragon_skill1-image").attr("src", "");

                break;

              case 'Energy Tide':
                $(".dragon_skill1-image").attr("src", "");

                break;

              case 'Tail Strikes':
                $(".dragon_skill1-image").attr("src", "");

                break;

              case 'Chilly Condition':
                $(".dragon_skill1-image").attr("src", "");

                break;

              case 'Grace':
                $(".dragon_skill1-image").attr("src", "");

                break;

              case 'Spotlight':
                $(".dragon_skill1-image").attr("src", "");

                break;

              case 'Slam':
                $(".dragon_skill1-image").attr("src", "");

                break;

              case 'Inspiration':
                $(".dragon_skill1-image").attr("src", "");

                break;

              case 'Mr. Killer':
                $(".dragon_skill1-image").attr("src", "");

                break;

              case 'Fury':
                $(".dragon_skill1-image").attr("src", "");

                break;

              case 'Flame Guard':
                $(".dragon_skill1-image").attr("src", "");

                break;

              case 'Burning Fires':
                $(".dragon_skill1-image").attr("src", "");

                break;

              case 'Flame Power':
                $(".dragon_skill1-image").attr("src", "");

                break;

              case 'Fire Bullet':
                $(".dragon_skill1-image").attr("src", "");

                break;

              case 'Fatal Strike':
                $(".dragon_skill1-image").attr("src", "");

                break;

              case 'Catcher':
                $(".dragon_skill1-image").attr("src", "");

                break;

              case 'Fireball Art':
                $(".dragon_skill1-image").attr("src", "");

                break;

              case 'Insight':
                $(".dragon_skill1-image").attr("src", "");

                break;

              case 'Acceleration':
                $(".dragon_skill1-image").attr("src", "");

                break;

              case 'Intake':
                $(".dragon_skill1-image").attr("src", "");

                break;

              case 'Breaker':
                $(".dragon_skill1-image").attr("src", "");

                break;

              case 'Flaming Blow':
                $(".dragon_skill1-image").attr("src", "");

                break;

              case 'Scorching':
                $(".dragon_skill1-image").attr("src", "");

                break;

              case 'Rage':
                $(".dragon_skill1-image").attr("src", "");

                break;

              case 'Aid Troop':
                $(".dragon_skill1-image").attr("src", "");

                break;

              case 'Body Armor':
                $(".dragon_skill1-image").attr("src", "");

                break;

              case 'Guarding':
                $(".dragon_skill1-image").attr("src", "");

                break;

              case 'Spikes':
                $(".dragon_skill1-image").attr("src", "");

                break;

              case 'Thorn Shield':
                $(".dragon_skill1-image").attr("src", "");

                break;

              case 'Shield Healer':
                $(".dragon_skill1-image").attr("src", "");

                break;

              case 'High Power':
                $(".dragon_skill1-image").attr("src", "");

                break;

              case 'Hard Shield':
                $(".dragon_skill1-image").attr("src", "");

                break;

              case 'Taunt':
                $(".dragon_skill1-image").attr("src", "");

                break;

              case 'Fire Attractor':
                $(".dragon_skill1-image").attr("src", "");

                break;

              case 'Coma Shield':
                $(".dragon_skill1-image").attr("src", "");

                break;

              case 'Mitigation':
                $(".dragon_skill1-image").attr("src", "");

                break;

              case 'Doom':
                $(".dragon_skill1-image").attr("src", "");

                break;

              case 'Wind Power':
                $(".dragon_skill1-image").attr("src", "");

                break;

              case 'Thorn Armor':
                $(".dragon_skill1-image").attr("src", "");

                break;

              case 'Tenacity':
                $(".dragon_skill1-image").attr("src", "");

                break;

              case 'Daze Shield':
                $(".dragon_skill1-image").attr("src", "");

                break;

              case 'Fortification':
                $(".dragon_skill1-image").attr("src", "");

                break;

              case 'Protector':
                $(".dragon_skill1-image").attr("src", "");

                break;

              case 'Shelter':
                $(".dragon_skill1-image").attr("src", "");

                break;

              case 'Flak Jacket':
                $(".dragon_skill1-image").attr("src", "");

                break;

              case 'Lethal':
                $(".dragon_skill1-image").attr("src", "");

                break;

              case 'Noble Strike':
                $(".dragon_skill1-image").attr("src", 'https://static.dragonmainland.io/img/aae68c81d44e638f814e0d05675330a2.png');

                break;

              case 'Dispel':
                $(".dragon_skill1-image").attr("src", "");

                break;

              case 'Depression':
                $(".dragon_skill1-image").attr("src", "");

                break;

              case 'Shackle':
                $(".dragon_skill1-image").attr("src", "");

                break;

              case 'Stun':
                $(".dragon_skill1-image").attr("src", "");

                break;

              case 'Breakdown':
                $(".dragon_skill1-image").attr("src", "");

                break;

              case 'Chill Wind':
                $(".dragon_skill1-image").attr("src", "");

                break;

              case 'Noise':
                $(".dragon_skill1-image").attr("src", "");

                break;

              case 'Avoid War':
                $(".dragon_skill1-image").attr("src", "");

                break;

              case 'Distant Attack':
                $(".dragon_skill1-image").attr("src", "");

                break;

              case 'Wind Blade':
                $(".dragon_skill1-image").attr("src", "");

                break;

              case 'Hurricane':
                $(".dragon_skill1-image").attr("src", "");

                break;

              case 'Acceleration':
                $(".dragon_skill1-image").attr("src", "");

                break;

              case 'Therapy Ban':
                $(".dragon_skill1-image").attr("src", "");

                break;

              case 'Destroy':
                $(".dragon_skill1-image").attr("src", "");

                break;

              case 'Defence':
                $(".dragon_skill1-image").attr("src", "");

                break;

              case 'Constraint':
                $(".dragon_skill1-image").attr("src", "");

                break;

              case 'Stabbing':
                $(".dragon_skill1-image").attr("src", "");

                break;

              case 'Perfection':
                $(".dragon_skill1-image").attr("src", "");

                break;

              case 'Thunderstorm':
                $(".dragon_skill1-image").attr("src", "");

                break;

              case 'Flash Strike':
                $(".dragon_skill1-image").attr("src", "");

                break;

              case 'Fierce strike':
                $(".dragon_skill1-image").attr("src", "https://static.dragonmainland.io/img/e607b1f0231511c6187215caf18ccf96.png");

                break;

              case 'Slap':
                $(".dragon_skill1-image").attr("src", "");

                break;

              case 'Dark horse':
                $(".dragon_skill1-image").attr("src", "");

                break;

              case 'Allied':
                $(".dragon_skill1-image").attr("src", "https://static.dragonmainland.io/img/26364d23b80d55a8f76118459c0e0ce2.png");

                break;

              case 'Thunderbolt':
                $(".dragon_skill1-image").attr("src", "");

                break;

              case 'Thief':
                $(".dragon_skill1-image").attr("src", "");

                break;

              case 'Painkiller':
                $(".dragon_skill1-image").attr("src", "");

                break;

              case 'Extract':
                $(".dragon_skill1-image").attr("src", "");

                break;

              case 'Thunderstorm':
                $(".dragon_skill1-image").attr("src", "");

                break;

              case 'Agile':
                $(".dragon_skill1-image").attr("src", "");

                break;

              case 'Destruction':
                $(".dragon_skill1-image").attr("src", "");

                break;

              case 'Stealth Attack':
                $(".dragon_skill1-image").attr("src", "");

                break;

              case 'Speed Killer':
                $(".dragon_skill1-image").attr("src", "https://static.dragonmainland.io/img/3fd5e8a5551ff9c5988a1e23c217d247.png");

                break;

              case 'Inspiration':
                $(".dragon_skill1-image").attr("src", "https://static.dragonmainland.io/img/913eaa48de03d3e4515d1e287b37b0aa.png");

                break;

              case 'Protector':
                $(".dragon_skill1-image").attr("src", "");

                break;

              case 'Seal-Rock':
                $(".dragon_skill1-image").attr("src", "");

                break;

              case 'Thunder Axe':
                $(".dragon_skill1-image").attr("src", "");

                break;

              case 'Angry Strike':
                $(".dragon_skill1-image").attr("src", "");

                break;

              default:

            }
            */
    }
  });
}
