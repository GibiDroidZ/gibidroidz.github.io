// Process input
$(".getInput").click(function() {
  var inputData = '{"no":"' + $(".dragonNo").val() + '"}';
  //var inputData = '{"no":"21887"}';
  retrieveDragon(inputData);
  var newURL = 'index.html?dragon=' + $(".dragonNo").val();
  window.history.replaceState(null, null, newURL);
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


      switch (dragons.data.clazz) {
        case 1:
          $(".dragon_number").removeClass().addClass('dragon_number dragon_type-water');
          $(".dragon_body").removeClass().addClass('dragon_body dragon_card-contentWater');
          break;

        case 2:
          $(".dragon_number").removeClass().addClass('dragon_number dragon_type-fire');
          $(".dragon_body").removeClass().addClass('dragon_body dragon_card-contentFire');
          break;

        case 3:
          $(".dragon_number").removeClass().addClass('dragon_number dragon_type-rock');
          $(".dragon_body").removeClass().addClass('dragon_body dragon_card-contentRock');
          break;

        case 4:
          $(".dragon_number").removeClass().addClass('dragon_number dragon_type-storm');
          $(".dragon_body").removeClass().addClass('dragon_body dragon_card-contentStorm');
          break;

        case 5:
          $(".dragon_number").removeClass().addClass('dragon_number dragon_type-thunder');
          $(".dragon_body").removeClass().addClass('dragon_body dragon_card-contentThunder');
          break;
        default:

      }

      switch (dragons.data.mutation) {
        case 0:
          $(".dragon_tag").removeClass().addClass('dragon_tag hide');
          break;

        case -2:
          $(".dragon_tag").html('Negative');
          $(".dragon_tag").removeClass().addClass('dragon_tag dragon_tab-negative');
          break;

        case 2:
          $(".dragon_tag").html('Rare');
          $(".dragon_tag").removeClass().addClass('dragon_tag dragon_tab-rare');
          break;

        case 4:
          $(".dragon_tag").html('Mystic');
          $(".dragon_tag").removeClass().addClass('dragon_tag dragon_tab-mystic');
          break;
        default:

      }

      if (dragons.data.mother == 0 && dragons.data.father == 0) {
        $(".dragon_tag").html('Genesis');
        $(".dragon_tag").removeClass().addClass('dragon_tag dragon_tab-genesis');
      }

      if (dragons.data.status == 1) {
        switch (dragons.data.clazz) {
          case 1:
            $(".dragon_body-egg").removeClass().addClass('dragon_body-egg dragon-WaterDragonEgg');
            break;

          case 2:
            $(".dragon_body-egg").removeClass().addClass('dragon_body-egg dragon-FireDragonEgg');
            break;

          case 3:
            $(".dragon_body-egg").removeClass().addClass('dragon_body-egg dragon-RockDragonEgg');
            break;

          case 4:
            $(".dragon_body-egg").removeClass().addClass('dragon_body-egg dragon-StormDragonEgg');
            break;

          case 5:
            $(".dragon_body-egg").removeClass().addClass('dragon_body-egg dragon-ThunderDragonEgg');
            break;
          default:

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

      var part1Mutation;
      var part2Mutation;
      var part3Mutation;
      var part4Mutation;
      var part5Mutation;
      var part6Mutation;

      switch (dragons.data.parts[0].mutation) {
        case 1:
          part1Mutation = '(Negative)';
          break;

        case 0:
          part1Mutation = '';
          break;

        case 1:
          part1Mutation = '(Rare)';
          break;

        case 2:
          part1Mutation = '(Mystic)';
          break;

        default:
      }

      switch (dragons.data.parts[1].mutation) {
        case -1:
          part2Mutation = '(Negative)';
          break;

        case 0:
          part2Mutation = '';
          break;

        case 1:
          part2Mutation = '(Rare)';
          break;

        case 2:
          part2Mutation = '(Mystic)';
          break;

        default:
      }

      switch (dragons.data.parts[2].mutation) {
        case -1:
          part3Mutation = '(Negative)';
          break;

        case 0:
          part3Mutation = '';
          break;

        case 1:
          part3Mutation = '(Rare)';
          break;

        case 2:
          part3Mutation = '(Mystic)';
          break;

        default:
      }

      switch (dragons.data.parts[3].mutation) {
        case -1:
          part4Mutation = '(Negative)';
          break;

        case 0:
          part4Mutation = '';
          break;

        case 1:
          part4Mutation = '(Rare)';
          break;

        case 2:
          part4Mutation = '(Mystic)';
          break;

        default:
      }

      switch (dragons.data.parts[4].mutation) {
        case -1:
          part5Mutation = '(Negative)';
          break;

        case 0:
          part5Mutation = '';
          break;

        case 1:
          part5Mutation = '(Rare)';
          break;

        case 2:
          part5Mutation = '(Mystic)';
          break;

        default:
      }

      switch (dragons.data.parts[5].mutation) {
        case -1:
          part6Mutation = '(Negative)';
          break;

        case 0:
          part6Mutation = '';
          break;

        case 1:
          part6Mutation = '(Rare)';
          break;

        case 2:
          part6Mutation = '(Mystic)';
          break;

        default:
      }

      $(".dragon_parts-eye").html(dragons.data.parts[0].dnaNameEn + '<i class="partMutation"> ' + part1Mutation + '</i>');
      $(".dragon_parts-totem").html(dragons.data.parts[1].dnaNameEn + '<i class="partMutation"> ' + part2Mutation + '</i>');
      $(".dragon_parts-horn").html(dragons.data.parts[2].dnaNameEn + '<i class="partMutation"> ' + part3Mutation + '</i>');
      $(".dragon_parts-ear").html(dragons.data.parts[3].dnaNameEn + '<i class="partMutation"> ' + part4Mutation + '</i>');
      $(".dragon_parts-wing").html(dragons.data.parts[4].dnaNameEn + '<i class="partMutation"> ' + part5Mutation + '</i>');
      $(".dragon_parts-tail").html(dragons.data.parts[5].dnaNameEn + '<i class="partMutation"> ' + part6Mutation + '</i>');

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


    }
  });
}
