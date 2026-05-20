const ASSETS = {
  melon: "./melon_juice.png",
  americano: "./mega_americano_ice.jpg",
  latte: "./cafe_latte_hot.jpg",
  cupStart: "./cup_ice.png",
  cupIce: "./ice_cup.png",
  cupWater: "./ice_water.png",
  cupAmericano: "./ice_americano.png",
  cupEspresso: "./espresso.png",
  espressoMachineIdle: "./espresso_machine1.png",
  espressoMachineDone: "./espresso_machine2.png",
  iceMini: "./ice_mini.png",
  waterMini: "./water_mini.png",
  coffeeMini: "./coffee_mini.png",
  milkMini: "./milk_mini.png",
  honeyMini: "./honey_mini.png",
  vanillaMini: "./vanilla_mini.png",
};

const stages = [
  {
    id: 1,
    label: "STAGE 1",
    level: "쉬움",
    reward: "소액 쿠폰",
    gaugeSpeed: 1.15,
    targetWidth: 22,
    recipes: [
      {
        name: "메가리카노 ICE",
        image: ASSETS.americano,
        tier: "easy",
        steps: [
          { type: "stop", ingredient: "얼음", target: 62 },
          { type: "stop", ingredient: "물", target: 72 },
          { type: "stop", ingredient: "에스프레소", target: 64 },
        ],
      },
      {
        name: "카페라떼 HOT",
        image: ASSETS.latte,
        tier: "easy",
        steps: [
          { type: "stop", ingredient: "에스프레소", target: 58 },
          { type: "stop", ingredient: "우유", target: 67 },
        ],
      },
      {
        name: "바닐라 라떼",
        image: ASSETS.latte,
        tier: "easy",
        steps: [
          { type: "stop", ingredient: "우유", target: 62 },
          { type: "select", ingredient: "바닐라 시럽", options: ["카라멜 시럽", "바닐라 시럽", "초코 시럽"] },
        ],
      },
    ],
  },
  {
    id: 2,
    label: "STAGE 2",
    level: "보통",
    reward: "중간 쿠폰",
    gaugeSpeed: 1.45,
    targetWidth: 16,
    recipes: [
      {
        name: "카라멜 라떼",
        image: ASSETS.latte,
        tier: "medium",
        steps: [
          { type: "stop", ingredient: "에스프레소", target: 55 },
          { type: "stop", ingredient: "우유", target: 70 },
          { type: "select", ingredient: "카라멜 시럽", options: ["바닐라 시럽", "카라멜 시럽", "헤이즐넛 시럽"] },
        ],
      },
      {
        name: "허니 수박 주스",
        image: ASSETS.melon,
        tier: "medium",
        isNew: true,
        steps: [
          { type: "select", ingredient: "수박 베이스", options: ["딸기 베이스", "수박 베이스", "망고 베이스"] },
          { type: "select", ingredient: "허니 시럽", options: ["허니 시럽", "카라멜 시럽", "바닐라 시럽"] },
          { type: "stop", ingredient: "물", target: 52 },
        ],
      },
      {
        name: "아이스크림 라떼",
        image: ASSETS.latte,
        tier: "medium",
        steps: [
          { type: "stop", ingredient: "에스프레소", target: 60 },
          { type: "select", ingredient: "바닐라 아이스크림", options: ["초코 아이스크림", "바닐라 아이스크림", "요거트 아이스크림"] },
          { type: "select", ingredient: "휘핑크림", options: ["휘핑크림", "폼 크림", "시나몬 파우더"] },
        ],
      },
    ],
  },
  {
    id: 3,
    label: "STAGE 3",
    level: "어려움 · 신메뉴",
    reward: "1,000원 할인쿠폰",
    gaugeSpeed: 1.9,
    targetWidth: 12,
    recipes: [
      {
        name: "더블샷 메가리카노",
        image: ASSETS.americano,
        tier: "hard",
        steps: [
          { type: "stop", ingredient: "에스프레소", target: 49 },
          { type: "stop", ingredient: "물", target: 78 },
          { type: "stop", ingredient: "에스프레소", target: 57 },
        ],
      },
      {
        name: "크림 카라멜 라떼",
        image: ASSETS.latte,
        tier: "hard",
        isNew: true,
        steps: [
          { type: "stop", ingredient: "에스프레소", target: 54 },
          { type: "stop", ingredient: "우유", target: 68 },
          { type: "select", ingredient: "카라멜 시럽", options: ["카라멜 소스", "카라멜 시럽", "헤이즐넛 시럽"] },
          { type: "select", ingredient: "휘핑크림", options: ["폼 크림", "휘핑크림", "바닐라 아이스크림"] },
        ],
      },
      {
        name: "꿀수박주스",
        image: ASSETS.melon,
        tier: "hard",
        isNew: true,
        steps: [
          { type: "select", ingredient: "수박 베이스", options: ["수박 베이스", "멜론 베이스", "딸기 베이스"] },
          { type: "select", ingredient: "허니 시럽", options: ["바닐라 시럽", "허니 시럽", "카라멜 시럽"] },
          { type: "stop", ingredient: "물", target: 46 },
          { type: "select", ingredient: "아이스크림", options: ["휘핑크림", "아이스크림", "시럽"] },
        ],
      },
    ],
  },
];

const state = {
  version: 3,
  view: "landing",
  stageIndex: 0,
  recipeIndex: 0,
  stepIndex: 0,
  stepPhase: "select",
  energy: 3,
  score: 0,
  xp: 0,
  coins: 0,
  perfect: 0,
  completedStages: [],
  completedRecipes: {},
  coupons: [],
  giftChances: 1,
  shareCompleted: false,
  lastFeedback: "",
  needle: 0,
  needleDirection: 1,
  timer: null,
  tab: "event",
  toast: "",
  recipeComplete: null,
  finishTimer: null,
  optionOrderCache: {},
};

const app = document.querySelector("#app");
const STORAGE_KEY = "coffee-tycoon-event-state";
const GOOD_ZONE_MULTIPLIER = 1.1;
const TIMING_GOOD_ZONE_EXPANSION_MULTIPLIER = 1.2;
const EXPANDED_GOOD_ZONE_INGREDIENTS = ["얼음", "물", "에스프레소", "우유"];
const GREAT_ZONE_WIDTH = 3;
const RECIPE_COMPLETION_WAIT_MS = 5000;

try {
  const savedState = JSON.parse(window.localStorage.getItem(STORAGE_KEY) || "null");
  if (savedState?.version === state.version) {
    Object.assign(state, savedState, { timer: null, toast: "" });
    if (state.view === "home") state.view = "landing";
    if (state.lastFeedback.includes("PERFECT")) state.lastFeedback = "Great";
    else if (state.lastFeedback.includes("GOOD") || state.lastFeedback.includes("OK") || state.lastFeedback.includes("성공") || state.lastFeedback.includes("선택했어요")) state.lastFeedback = "Good";
    else if (state.lastFeedback) state.lastFeedback = "Bad";
  }
} catch {
  try {
    window.localStorage.removeItem(STORAGE_KEY);
  } catch {
    // 저장소 자체가 막힌 환경에서는 무시한다.
  }
}

if (!state.optionOrderCache) state.optionOrderCache = {};

function currentStage() {
  return stages[state.stageIndex];
}

function currentRecipe() {
  return currentStage().recipes[state.recipeIndex];
}

function currentStep() {
  return currentRecipe().steps[state.stepIndex];
}

function shuffleOptions(options) {
  const shuffled = [...options];
  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [shuffled[index], shuffled[randomIndex]] = [shuffled[randomIndex], shuffled[index]];
  }
  return shuffled;
}

function optionCacheKey() {
  return `${state.stageIndex}-${state.recipeIndex}-${state.stepIndex}`;
}

function stepOptions(step) {
  const cacheKey = optionCacheKey();
  if (state.optionOrderCache[cacheKey]) return state.optionOrderCache[cacheKey];

  const recipeIngredients = currentRecipe().steps.map((recipeStep) => recipeStep.ingredient);
  const distractors = ["우유", "허니 시럽", "바닐라 시럽", "카라멜 시럽", "수박 베이스", "초코 시럽"];
  const options = step.options
    ? [...new Set(step.options)]
    : [...new Set([...recipeIngredients, ...distractors.filter((option) => !recipeIngredients.includes(option))])].slice(0, 6);

  const randomizedOptions = shuffleOptions(options);
  state.optionOrderCache[cacheKey] = randomizedOptions;
  return randomizedOptions;
}

function isExpandedGoodZoneIngredient(ingredient) {
  return EXPANDED_GOOD_ZONE_INGREDIENTS.some((keyword) => ingredient.includes(keyword));
}

function getGoodZoneWidth(stage, step) {
  const baseWidth = stage.targetWidth * GOOD_ZONE_MULTIPLIER;
  const expandedWidth = isExpandedGoodZoneIngredient(step.ingredient)
    ? baseWidth * TIMING_GOOD_ZONE_EXPANSION_MULTIPLIER
    : baseWidth;
  return Math.min(100, expandedWidth);
}

function getGaugeZone(center, width) {
  const safeWidth = Math.max(0, Math.min(100, width));
  const left = Math.max(0, Math.min(100 - safeWidth, center - safeWidth / 2));
  return {
    left,
    width: safeWidth,
    right: left + safeWidth,
  };
}

function getGaugeZones(stage, step) {
  return {
    good: getGaugeZone(step.target, getGoodZoneWidth(stage, step)),
    great: getGaugeZone(step.target, GREAT_ZONE_WIDTH),
  };
}

function isNeedleInZone(needle, zone) {
  return needle >= zone.left && needle <= zone.right;
}

function getStopVerdict(needle, stage, step) {
  const zones = getGaugeZones(stage, step);
  if (isNeedleInZone(needle, zones.great)) {
    return { verdict: "Great", score: 120 };
  }
  if (isNeedleInZone(needle, zones.good)) {
    return { verdict: "Good", score: 90 };
  }
  return { verdict: "Bad", score: 0 };
}

function verifyGaugeVerdictConsistency() {
  const mismatches = [];
  let checked = 0;
  stages.forEach((stage) => {
    stage.recipes.forEach((recipe) => {
      recipe.steps
        .filter((step) => step.type === "stop")
        .forEach((step) => {
          const zones = getGaugeZones(stage, step);
          for (let needle = 0; needle <= 100; needle += 0.5) {
            const expected = isNeedleInZone(needle, zones.great)
              ? "Great"
              : isNeedleInZone(needle, zones.good)
                ? "Good"
                : "Bad";
            const actual = getStopVerdict(needle, stage, step).verdict;
            checked += 1;
            if (expected !== actual) {
              mismatches.push({ stage: stage.id, recipe: recipe.name, ingredient: step.ingredient, needle, expected, actual });
            }
          }
        });
    });
  });

  return {
    ok: mismatches.length === 0,
    checked,
    mismatches,
  };
}

function track(name, meta = {}) {
  console.info("[event]", name, {
    campaign_id: "coffee-tycoon-2026",
    session_id: "demo-session",
    stage: currentStage()?.id,
    ...meta,
  });
}

function setView(view) {
  stopGauge();
  clearFinishTimer();
  state.view = view;
  render();
}

function showToast(message) {
  state.toast = message;
  render();
  window.setTimeout(() => {
    state.toast = "";
    render();
  }, 1800);
}

function startEvent() {
  state.stageIndex = 0;
  state.recipeIndex = 0;
  state.stepIndex = 0;
  state.stepPhase = "select";
  state.energy = Math.max(state.energy - 1, 0);
  state.lastFeedback = "";
  state.recipeComplete = null;
  state.optionOrderCache = {};
  track("stage_start", { stage: 1, recipe_ids: stages[0].recipes.map((recipe) => recipe.name) });
  setView("stage");
}

function startGauge() {
  stopGauge();
  state.needle = 0;
  state.needleDirection = 1;
  state.timer = window.setInterval(() => {
    const next = state.needle + state.needleDirection * currentStage().gaugeSpeed * 3.8;
    if (next >= 100) {
      state.needle = 100;
      state.needleDirection = -1;
    } else if (next <= 0) {
      state.needle = 0;
      state.needleDirection = 1;
    } else {
      state.needle = next;
    }
    updateGaugeNeedle();
  }, 60);
}

function stopGauge() {
  if (state.timer) {
    window.clearInterval(state.timer);
    state.timer = null;
  }
}

function clearFinishTimer() {
  if (state.finishTimer) {
    window.clearTimeout(state.finishTimer);
    state.finishTimer = null;
  }
}

function updateGaugeNeedle() {
  const needle = document.querySelector(".gauge-needle");
  if (needle) needle.style.left = `${state.needle}%`;
}

function judgeStop() {
  if (state.stepPhase !== "action") {
    showToast("먼저 레시피에 맞는 재료를 선택해 주세요.");
    return;
  }
  const step = currentStep();
  const { verdict, score } = getStopVerdict(state.needle, currentStage(), step);
  if (verdict === "Great") {
    state.perfect += 1;
  }
  state.score += score;
  state.xp += Math.max(10, Math.round(score / 5));
  state.coins += Math.max(2, Math.round(score / 18));
  state.lastFeedback = verdict;
  track("step_result", { interaction_type: "stop_timing", result: verdict, ingredient: step.ingredient });
  if (verdict === "Bad") {
    stopGauge();
    state.stepPhase = "failed";
    render();
    return;
  }
  if (currentRecipe().name === "메가리카노 ICE" && step.ingredient === "에스프레소" && state.stepIndex === currentRecipe().steps.length - 1) {
    finishAmericanoEspressoStep();
    return;
  }
  nextStep();
}

function chooseOption(option) {
  const step = currentStep();
  if (option === step.ingredient) {
    if (step.type === "stop" && state.stepPhase === "select") {
      state.stepPhase = "action";
      state.lastFeedback = "";
      track("ingredient_selected", { result: "correct", ingredient: step.ingredient, next_interaction: "stop_timing" });
      render();
      return;
    }
    state.score += 70;
    state.xp += 16;
    state.coins += 4;
    state.lastFeedback = "Great";
    track("step_result", { interaction_type: "simple_select", result: "correct", ingredient: step.ingredient });
    nextStep();
  } else {
    state.score = Math.max(0, state.score - 8);
    state.lastFeedback = "Bad";
    track("step_result", { interaction_type: "simple_select", result: "wrong", ingredient: step.ingredient });
    render();
  }
}

function nextStep() {
  stopGauge();
  const recipe = currentRecipe();
  if (state.stepIndex < recipe.steps.length - 1) {
    state.stepIndex += 1;
    state.stepPhase = "select";
    state.needle = 0;
    state.optionOrderCache = {};
    render();
    return;
  }

  const key = `${currentStage().id}-${state.recipeIndex}`;
  state.completedRecipes[key] = true;
  track("recipe_clear", { recipe_slot: state.recipeIndex + 1, recipe_id: recipe.name });
  state.stepPhase = "finishing";
  state.recipeComplete = {
    name: recipe.name,
    image: recipe.image,
    ready: false,
  };
  state.lastFeedback = "Great";
  render();
  clearFinishTimer();
  state.finishTimer = window.setTimeout(() => {
    state.finishTimer = null;
    if (!state.recipeComplete) return;
    state.recipeComplete.ready = true;
    state.stepPhase = "complete";
    render();
  }, RECIPE_COMPLETION_WAIT_MS);
}

function finishAmericanoEspressoStep() {
  stopGauge();
  const recipe = currentRecipe();
  const key = `${currentStage().id}-${state.recipeIndex}`;
  state.completedRecipes[key] = true;
  state.stepPhase = "espresso-done";
  state.recipeComplete = null;
  state.lastFeedback = "Great";
  track("recipe_clear", { recipe_slot: state.recipeIndex + 1, recipe_id: recipe.name });
  render();
  clearFinishTimer();
  state.finishTimer = window.setTimeout(() => {
    state.stepPhase = "finishing";
    state.recipeComplete = {
      name: recipe.name,
      image: recipe.image,
      ready: false,
    };
    render();
    state.finishTimer = window.setTimeout(() => {
      state.finishTimer = null;
      if (!state.recipeComplete) return;
      state.recipeComplete.ready = true;
      state.stepPhase = "complete";
      render();
    }, RECIPE_COMPLETION_WAIT_MS);
  }, 2000);
}

function continueNextRecipe() {
  clearFinishTimer();
  state.recipeComplete = null;
  if (state.recipeIndex < currentStage().recipes.length - 1) {
    state.recipeIndex += 1;
    state.stepIndex = 0;
    state.stepPhase = "select";
    state.needle = 0;
    state.lastFeedback = "";
    state.optionOrderCache = {};
    render();
    return;
  }
  completeStage();
}

function completeStage() {
  const stageId = currentStage().id;
  if (!state.completedStages.includes(stageId)) {
    state.completedStages.push(stageId);
  }
  state.coupons.push({
    name: `${currentStage().label} 클리어 쿠폰`,
    value: stageId === 3 ? "1,000원" : stageId === 2 ? "700원" : "300원",
    expires: "D-14",
    status: "사용 가능",
  });
  state.giftChances += stageId === 1 ? 1 : 0;
  track("stage_end", { result: "clear", stage: stageId });
  setView("result");
}

function goNextStage() {
  if (state.stageIndex < stages.length - 1) {
    clearFinishTimer();
    state.stageIndex += 1;
    state.recipeIndex = 0;
    state.stepIndex = 0;
    state.stepPhase = "select";
    state.energy = Math.max(state.energy - 1, 0);
    state.lastFeedback = "";
    state.recipeComplete = null;
    state.optionOrderCache = {};
    track("stage_start", { stage: currentStage().id, recipe_ids: currentStage().recipes.map((recipe) => recipe.name) });
    setView("stage");
  } else {
    setView("final");
  }
}

function replay() {
  clearFinishTimer();
  state.stageIndex = 0;
  state.recipeIndex = 0;
  state.stepIndex = 0;
  state.stepPhase = "select";
  state.score = 0;
  state.xp = 0;
  state.coins = 0;
  state.perfect = 0;
  state.completedStages = [];
  state.completedRecipes = {};
  state.lastFeedback = "";
  state.recipeComplete = null;
  state.optionOrderCache = {};
  track("replay_start");
  setView("landing");
}

function selectRecipe(index) {
  if (index === state.recipeIndex) return;
  if (state.completedRecipes[`${currentStage().id}-${index}`]) {
    showToast("이미 완료한 레시피예요.");
    return;
  }
  showToast("레시피 순서대로 진행해요.");
}

function claimCoupon() {
  showToast("쿠폰함에서 확인할 수 있어요.");
  track("coupon_claim", { coupon_count: state.coupons.length });
}

function shareResult() {
  state.shareCompleted = true;
  state.giftChances += 1;
  track("share_complete", { channel: "demo", result_card_id: "latte-balance-master" });
  showToast("친구와 추가 플레이 기회를 받을 수 있어요.");
}

function shareRetry() {
  state.shareCompleted = true;
  state.giftChances += 1;
  state.stepPhase = "select";
  state.needle = 0;
  state.lastFeedback = "";
  state.optionOrderCache = {};
  track("share_retry", { channel: "demo", stage: currentStage().id, recipe_id: currentRecipe().name, step: currentStep().ingredient });
  showToast("공유 완료! 한 번 더 시도할 수 있어요.");
}

function openGift() {
  if (state.giftChances <= 0) {
    showToast("오늘 받을 수 있는 선물을 모두 열었어요.");
    return;
  }
  state.giftChances -= 1;
  state.coupons.push({
    name: "시즌 선물 쿠폰",
    value: "500원",
    expires: "D-7",
    status: "사용 가능",
  });
  track("season_gift_open", { result: "500원 쿠폰" });
  showToast("500원 쿠폰을 받았어요.");
  render();
}

function renderStatusBar() {
  return `
    <div class="status-bar">
      <strong>6:02</strong>
      <span class="status-icons">LTE <span class="battery">14</span></span>
    </div>
  `;
}

function renderNav(back = "landing", right = "") {
  return `
    ${renderStatusBar()}
    <div class="nav-row">
      <button class="back-button" aria-label="뒤로가기" onclick="setView('${back}')">‹</button>
      ${right}
    </div>
  `;
}

function renderIsland() {
  return `<div class="island"><span class="coffee-drop"></span></div>`;
}

function renderCheckBurst() {
  return `
    <div class="check-burst" aria-label="완료">
      <i class="burst-piece"></i><i class="burst-piece"></i><i class="burst-piece"></i>
      <i class="burst-piece"></i><i class="burst-piece"></i><i class="burst-piece"></i>
    </div>
  `;
}

function formatRecipeName(name) {
  return name.replace(/\s(ICE|HOT)$/u, " ($1)");
}

function formatRecipePopupName(name) {
  return name.replace(/\sICE$/u, " (Ice)").replace(/\sHOT$/u, " (Hot)");
}

function ingredientIcon(ingredient) {
  if (ingredient.includes("얼음")) return ASSETS.iceMini;
  if (ingredient.includes("물")) return ASSETS.waterMini;
  if (ingredient.includes("에스프레소") || ingredient.includes("커피")) return ASSETS.coffeeMini;
  if (ingredient.includes("우유")) return ASSETS.milkMini;
  if (ingredient.includes("허니")) return ASSETS.honeyMini;
  if (ingredient.includes("바닐라")) return ASSETS.vanillaMini;
  return "";
}

function renderIngredientIcon(ingredient, className) {
  const icon = ingredientIcon(ingredient);
  return icon ? `<img class="${className}" src="${icon}" alt="" onerror="this.style.display='none'" />` : "";
}

function renderRecipeSequence() {
  const ingredients = currentRecipe().steps.map((step) => step.ingredient);
  return `
    <div class="recipe-sequence" aria-label="레시피 순서: ${ingredients.join(", ")}">
      <h3 class="sequence-title"><span>${currentStage().label}</span><span>${formatRecipeName(currentRecipe().name)}</span></h3>
      <div class="sequence-list">
      ${ingredients
        .map((ingredient, index) => {
          const isCompleted = Boolean(state.recipeComplete) || index < state.stepIndex;
          const isActive = !isCompleted && index === state.stepIndex;
          return `
            <div class="sequence-item ${isCompleted ? "completed" : ""} ${isActive ? "active" : ""}">
              ${renderIngredientIcon(ingredient, "sequence-icon")}
              <strong>${ingredient}</strong>
            </div>
          `;
        })
        .join("")}
      </div>
    </div>
  `;
}

function renderMakingGraphic() {
  const step = currentStep();
  const isAmericano = currentRecipe().name === "메가리카노 ICE";
  const feedback = ["Bad", "Good", "Great"].includes(state.lastFeedback) ? state.lastFeedback : "";
  const stageImage =
    state.recipeComplete?.ready || state.stepPhase === "complete"
      ? currentRecipe().image
      : state.recipeComplete || state.stepPhase === "finishing"
        ? isAmericano ? ASSETS.cupAmericano : currentRecipe().image
        : isAmericano && state.stepPhase === "espresso-done"
          ? ASSETS.espressoMachineDone
          : isAmericano && state.stepPhase === "action" && step.ingredient === "얼음"
            ? ASSETS.cupIce
            : isAmericano && state.stepPhase === "action" && step.ingredient === "물"
              ? ASSETS.cupWater
              : isAmericano && state.stepPhase === "action" && step.ingredient === "에스프레소"
                ? ASSETS.espressoMachineIdle
                : isAmericano && state.stepIndex >= 2
                  ? ASSETS.cupWater
                  : isAmericano && state.stepIndex >= 1
                    ? ASSETS.cupIce
                    : isAmericano
                      ? ASSETS.cupStart
                      : currentRecipe().image;
  return `
    <div class="making-graphic" aria-label="${formatRecipeName(currentRecipe().name)} 만드는 중">
      ${feedback ? `<span class="timing-feedback ${feedback.toLowerCase()}">${feedback}</span>` : ""}
      <img class="making-image" src="${stageImage}" alt="" onerror="this.onerror=null;this.src='${currentRecipe().image || ASSETS.cupStart}'" />
    </div>
  `;
}

function renderRecipeCompleteModal() {
  if (!state.recipeComplete?.ready) return "";
  return `
    <div class="completion-backdrop" role="dialog" aria-modal="true" aria-label="${formatRecipePopupName(state.recipeComplete.name)} 완성">
      <article class="completion-modal">
        <h2>${formatRecipePopupName(state.recipeComplete.name)} 완성!</h2>
        <img class="completion-image" src="${state.recipeComplete.image}" alt="" onerror="this.onerror=null;this.src='${ASSETS.cupStart}'" />
        <button class="primary-button" onclick="continueNextRecipe()">다음 레시피 만들기</button>
      </article>
    </div>
  `;
}

function renderLanding() {
  track("landing_view");
  return `
    <section class="page sky">
      ${renderNav("landing", `<button class="guide-button" onclick="setView('info')" aria-label="안내">안내</button>`)}
      <div class="hero-center challenge-title">
        <h1>커피 만들고<br /><span class="blue-text">1,000원 할인쿠폰 받기</span></h1>
        <p class="copy">STAGE3까지 모두 레시피대로 완성하세요!</p>
      </div>
      <section class="mission-card challenge-mission">
        <div class="mission-head">
          <div>
            <h3>STAGE 1</h3>
          </div>
        </div>
        <div class="mission-grid">
          <div class="mission-tile"><span class="tile-number">1</span><span class="recipe-image-slot"><img class="recipe-tile-image" src="${ASSETS.americano}" alt="" /></span><span class="recipe-label">메가리카노<br />(Ice)</span></div>
          <div class="mission-tile"><span class="tile-number">2</span><span class="recipe-image-slot"><img class="recipe-tile-image" src="${ASSETS.latte}" alt="" /></span><span class="recipe-label">카페라떼<br />(Hot)</span></div>
          <div class="mission-tile"><span class="tile-number">3</span><span class="recipe-image-slot"><img class="recipe-tile-image" src="${ASSETS.melon}" alt="" /></span><span class="recipe-label">꿀수박주스</span></div>
        </div>
      </section>
      <div class="fixed-actions challenge-actions">
        <button class="primary-button" onclick="startEvent()">커피 만들기 시작!</button>
      </div>
    </section>
  `;
}

function renderStage() {
  const stage = currentStage();
  const step = currentStep();
  const stopStep = step.type === "stop";
  const selectingIngredient = state.stepPhase === "select";
  const failedStep = state.stepPhase === "failed";
  const completingRecipe = Boolean(state.recipeComplete);
  const zones = stopStep ? getGaugeZones(stage, step) : null;

  window.setTimeout(() => {
    if (stopStep && state.stepPhase === "action" && state.view === "stage") startGauge();
  }, 0);

  return `
    <section class="page deep-sky">
      ${renderNav("landing")}
      <div class="object-area compact">
        ${renderRecipeSequence()}
      </div>
      <section class="bottom-panel">
        ${renderMakingGraphic()}
        <section class="workbench">
          ${
            completingRecipe
              ? `
                <div class="completion-loading" role="status" aria-live="polite">
                  <span class="loading-cup" aria-hidden="true"></span>
                  <div class="step-title">레시피가 완성되고 있어요</div>
                </div>
              `
              : failedStep
              ? `
                <div class="step-title">타이밍이 빗나갔어요</div>
                <p class="hint-text retry-copy">친구에게 공유하면 이번 재료를 한 번 더 시도할 수 있어요.</p>
                <button class="primary-button" onclick="shareRetry()">친구에게 공유하고 다시 시도</button>
              `
              : selectingIngredient
              ? `
                <div class="step-title">레시피 순서대로 재료를 선택해주세요</div>
                <div class="choice-grid">
                  ${stepOptions(step).map((option) => `<button class="choice-button" onclick="chooseOption('${option}')">${renderIngredientIcon(option, "choice-icon")}<span>${option}</span></button>`).join("")}
                </div>
              `
              : `
                <div class="step-title">목표 구간에 맞춰 멈춰주세요</div>
                <div class="gauge">
                  <span class="target-zone" style="left:${zones.good.left}%; width:${zones.good.width}%;"></span>
                  <span class="great-zone" style="left:${zones.great.left}%; width:${zones.great.width}%;"></span>
                  <span class="gauge-needle" style="left:${state.needle}%;"></span>
                </div>
                <button class="primary-button" onclick="judgeStop()">STOP</button>
              `
          }
        </section>
      </section>
      ${renderRecipeCompleteModal()}
    </section>
  `;
}

function renderResult() {
  const stage = currentStage();
  const isFinal = stage.id === 3;
  const scoreLine = `${stage.label} 미션에서 ${state.score}점 받았어요`;
  return `
    <section class="page sky result-page">
      ${renderNav("landing")}
      <div class="hero-center result-title">
        <p class="copy">${stage.label} 미션 완료</p>
        <h1><span class="blue-text">${isFinal ? "1,000원" : state.coupons.at(-1)?.value ?? "300원"}</span> 받았어요!</h1>
      </div>
      <div class="object-area">${renderCheckBurst()}</div>
      <section class="mission-card result-summary">
        <h3>${isFinal ? "라떼 밸런스 장인" : "루키 바리스타"}</h3>
        <p class="hint-text">${scoreLine} · PERFECT ${state.perfect}회</p>
      </section>
      <div class="fixed-actions">
        <button class="primary-button" onclick="${isFinal ? "setView('final')" : "goNextStage()"}">${isFinal ? "완료" : `STAGE ${stage.id + 1} 가기`}</button>
        <button class="secondary-button" onclick="shareResult()">결과 공유하기</button>
      </div>
    </section>
  `;
}

function renderFinal() {
  return `
    <section class="page white">
      ${renderNav("landing")}
      <div class="hero-center" style="padding-top:70px;">
        <h1>오늘의 카페 등급이<br />나왔어요</h1>
        <p class="copy">라떼 밸런스 장인 · 총점 ${state.score}점</p>
      </div>
      <div class="object-area">
        <img class="drink-object" src="${ASSETS.latte}" alt="카페라떼" />
      </div>
      <article class="share-preview">
        <h3>STAGE 3까지 완료하고 1,000원 쿠폰을 받아요</h3>
        <p class="hint-text">쿠폰은 계정 기준으로 발급/사용이 제한될 수 있어요.</p>
      </article>
      <div class="fixed-actions">
        <button class="primary-button" onclick="claimCoupon()">1,000원 쿠폰 받기</button>
        <button class="secondary-button" onclick="setView('share')">친구와 선물 기회 받기</button>
      </div>
    </section>
  `;
}

function renderShare() {
  return `
    <section class="page sky">
      ${renderNav("final")}
      <div class="hero-center">
        <h1>친구와<br /><span class="blue-text">선물 기회 1회씩</span> 받아요</h1>
        <p class="copy">친구가 STAGE 1을 완료하면 추가 플레이 기회를 받을 수 있어요</p>
      </div>
      <div class="object-area compact">${renderIsland()}</div>
      <article class="share-preview">
        <h3>내 결과 카드 미리보기</h3>
        <p class="hint-text">라떼 밸런스 장인 · ${state.score}점 · PERFECT ${state.perfect}회</p>
        <div class="share-benefits">
          <div class="benefit-tile"><h3>나</h3><p class="hint-text">추가 플레이 1회</p></div>
          <div class="benefit-tile"><h3>친구</h3><p class="hint-text">첫 플레이 보너스</p></div>
        </div>
      </article>
      <div class="fixed-actions">
        <button class="primary-button" onclick="shareResult()">친구와 선물 기회 받기</button>
        <button class="secondary-button" onclick="setView('final')">나중에 하기</button>
      </div>
    </section>
  `;
}

function renderWallet() {
  return `
    <section class="page white">
      ${renderNav("landing")}
      <div class="hero-left">
        <h1>쿠폰함</h1>
        <p class="copy">사용 가능한 쿠폰을 먼저 보여줘요</p>
      </div>
      ${state.coupons.length === 0 ? `<article class="coupon-row"><div><h3>아직 받은 쿠폰이 없어요</h3><p class="hint-text">STAGE를 완료하고 쿠폰을 받아요.</p></div><span class="badge">대기</span></article>` : ""}
      ${state.coupons
        .map(
          (coupon) => `
          <article class="coupon-row">
            <div>
              <h3>${coupon.name}</h3>
              <p class="hint-text">${coupon.status} · ${coupon.expires} · 앱/매장 사용 가능</p>
            </div>
            <div class="coupon-value">${coupon.value}</div>
          </article>
        `,
        )
        .join("")}
      <article class="coupon-row"><div><h3>사용 조건</h3><p class="hint-text">일정 기간 동안 받을/쓸 수 있는 횟수가 정해져 있어요.</p></div><span class="badge">안내</span></article>
      <div class="fixed-actions">
        <button class="primary-button" onclick="setView('landing')">이벤트로 돌아가기</button>
        <button class="secondary-button" onclick="showToast('도움말로 연결할 수 있어요.')">도움말 보기</button>
      </div>
    </section>
  `;
}

function renderInfo() {
  return `
    <section class="page white">
      ${renderNav("landing")}
      <div class="hero-left">
        <h1>STAGE 3까지 완료하면<br /><span class="blue-text">1,000원 쿠폰</span>을 받아요</h1>
        <p class="copy">무엇을, 어떻게, 언제까지 쓸 수 있는지 먼저 확인할 수 있어요.</p>
      </div>
      <article class="coupon-row"><div><h3>1</h3><p class="hint-text">STAGE마다 레시피 3개가 자동으로 준비돼요</p></div></article>
      <article class="coupon-row"><div><h3>2</h3><p class="hint-text">STOP 타이밍과 재료 선택으로 음료를 완성해요</p></div></article>
      <article class="coupon-row"><div><h3>3</h3><p class="hint-text">공유하지 않아도 핵심 보상은 받을 수 있어요</p></div></article>
      <div class="fixed-actions">
        <button class="primary-button" onclick="startEvent()">알아보기</button>
        <button class="secondary-button" onclick="setView('landing')">돌아가기</button>
      </div>
    </section>
  `;
}

function renderDashboard() {
  const totalRecipes = Object.keys(state.completedRecipes).length;
  return `
    <section class="page white">
      ${renderNav("landing")}
      <div class="hero-left">
        <h1>운영 지표<br />미리보기</h1>
        <p class="copy">배너 진입부터 공유, 선물, 쿠폰까지 핵심 퍼널을 확인해요.</p>
      </div>
      <div class="tabs">
        ${["event", "stage", "share", "abuse"].map((tab) => `<button class="tab-button ${state.tab === tab ? "active" : ""}" onclick="state.tab='${tab}'; render();">${tab}</button>`).join("")}
      </div>
      <article class="metric-row"><div><h3>STAGE 클리어</h3><p class="hint-text">1/2/3 도달률과 클리어율</p></div><strong class="metric-value">${state.completedStages.length}/3</strong></article>
      <article class="metric-row"><div><h3>레시피 성공</h3><p class="hint-text">9개 레시피별 성공률</p></div><strong class="metric-value">${totalRecipes}/9</strong></article>
      <article class="metric-row"><div><h3>공유 완료</h3><p class="hint-text">결과 카드 공유 이벤트</p></div><strong class="metric-value">${state.shareCompleted ? "완료" : "대기"}</strong></article>
      <article class="metric-row"><div><h3>어뷰즈 가드</h3><p class="hint-text">자기 초대·반복 공유·비정상 점수 제한</p></div><strong class="metric-value">ON</strong></article>
      <div class="fixed-actions">
        <button class="primary-button" onclick="setView('landing')">사용자 화면 보기</button>
        <button class="secondary-button" onclick="setView('gift')">선물 열기 화면</button>
      </div>
    </section>
  `;
}

function renderGift() {
  return `
    <section class="page sky">
      ${renderNav("landing")}
      <div class="hero-center">
        <h1>선물 기회<br /><span class="blue-text">${state.giftChances}회</span>가 있어요</h1>
        <p class="copy">열면 쿠폰이나 추가 플레이 기회를 받을 수 있어요</p>
      </div>
      <div class="object-area">${renderCheckBurst()}</div>
      <article class="mission-card">
        <h3>보상 안내</h3>
        <p class="hint-text">오늘 받을 수 있는 보상 횟수가 정해져 있어요. 랜덤 보상은 확률과 조건을 안내해야 해요.</p>
      </article>
      <div class="fixed-actions">
        <button class="primary-button" onclick="openGift()">선물 열기</button>
        <button class="secondary-button" onclick="setView('landing')">나중에 열기</button>
      </div>
    </section>
  `;
}

function render() {
  const views = {
    landing: renderLanding,
    stage: renderStage,
    result: renderResult,
    final: renderFinal,
    share: renderShare,
    wallet: renderWallet,
    info: renderInfo,
    dashboard: renderDashboard,
    gift: renderGift,
  };
  const view = views[state.view] ? state.view : "landing";
  app.innerHTML = `${views[view]()}${state.toast ? `<div class="toast">${state.toast}</div>` : ""}`;
  const { timer, toast, finishTimer, ...persistableState } = state;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(persistableState));
  } catch {
    // file:// 환경에서는 저장소 접근이 막힐 수 있으므로 렌더링을 우선한다.
  }
}

window.setView = setView;
window.startEvent = startEvent;
window.judgeStop = judgeStop;
window.chooseOption = chooseOption;
window.selectRecipe = selectRecipe;
window.continueNextRecipe = continueNextRecipe;
window.goNextStage = goNextStage;
window.claimCoupon = claimCoupon;
window.shareResult = shareResult;
window.shareRetry = shareRetry;
window.replay = replay;
window.openGift = openGift;
window.state = state;
window.render = render;
window.showToast = showToast;
window.verifyGaugeVerdictConsistency = verifyGaugeVerdictConsistency;

render();
