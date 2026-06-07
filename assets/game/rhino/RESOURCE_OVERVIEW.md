# Rhino 资源说明

来源：`/Users/lkt/Desktop/动画下载&组织/犀牛游戏/spine_ready`

导入后目录：`assets/game/rhino/spine`

处理方式：原贴图文件扩展名多为 `.png`，但实际内容是 AVIF；已转换为真正 PNG。原 `.bin` 已同时保留并复制为 `.skel`，用于 Cocos Spine 识别。

数量：60 套 Spine，60 个 `.skel`，60 个 `.atlas`，69 张 PNG。

## 使用方式

在 Cocos 中使用时，优先拖每个目录下的 `.skel` 到 `sp.Skeleton` 的 Skeleton Data。对应 `.atlas` 和 PNG 已放在同目录。

## 分类

### Daily Drops 通用资源

- `popup` -> `assets/game/rhino/spine/daily_drops_default_popup`
  - 文件：`daily_drops_default_popup.skel`, `daily_drops_default_popup.atlas`, 贴图：`popup.png`
  - 动画：`activation`, `deactivation`, `idle`

### Gift Spins / Free Spins

- `fs` -> `assets/game/rhino/spine/giftspins_fs`
  - 文件：`giftspins_fs.skel`, `giftspins_fs.atlas`, 贴图：`fs.png`, `fs2.png`, `fs3.png`, `fs4.png`, `fs5.png`
  - 动画：`apperence`, `choise_idle`, `choise_in`, `choise_out`, `idle`
- `free_spins_popup` -> `assets/game/rhino/spine/giftspins_start_choose_bet_free_spins_popup`
  - 文件：`giftspins_start_choose_bet_free_spins_popup.skel`, `giftspins_start_choose_bet_free_spins_popup.atlas`, 贴图：`free_spins_choose_bet.png`
  - 动画：`decline`, `idle`, `later`, `start`
- `qty_free_spins` -> `assets/game/rhino/spine/giftspins_start_choose_bet_qty_free_spins`
  - 文件：`giftspins_start_choose_bet_qty_free_spins.skel`, `giftspins_start_choose_bet_qty_free_spins.atlas`, 贴图：`free_spins_choose_bet.png`
  - 动画：`decline`, `idle`, `qty_change`, `start`
- `rays_skeleton` -> `assets/game/rhino/spine/giftspins_start_choose_bet_rays_skeleton`
  - 文件：`giftspins_start_choose_bet_rays_skeleton.skel`, `giftspins_start_choose_bet_rays_skeleton.atlas`, 贴图：`free_spins_choose_bet.png`
  - 动画：`idle`, `start`
- `free_spins_popup` -> `assets/game/rhino/spine/giftspins_start_static_bet_free_spins_popup`
  - 文件：`giftspins_start_static_bet_free_spins_popup.skel`, `giftspins_start_static_bet_free_spins_popup.atlas`, 贴图：`free_spins_static_bet.png`
  - 动画：`decline`, `idle`, `later`, `start`
- `qty_free_spins` -> `assets/game/rhino/spine/giftspins_start_static_bet_qty_free_spins`
  - 文件：`giftspins_start_static_bet_qty_free_spins.skel`, `giftspins_start_static_bet_qty_free_spins.atlas`, 贴图：`free_spins_static_bet.png`
  - 动画：`decline`, `idle`, `start`
- `rays_skeleton` -> `assets/game/rhino/spine/giftspins_start_static_bet_rays_skeleton`
  - 文件：`giftspins_start_static_bet_rays_skeleton.skel`, `giftspins_start_static_bet_rays_skeleton.atlas`, 贴图：`free_spins_static_bet.png`
  - 动画：`idle`, `start`
- `free_spins_win` -> `assets/game/rhino/spine/giftspins_summary_popup_free_spins_win`
  - 文件：`giftspins_summary_popup_free_spins_win.skel`, `giftspins_summary_popup_free_spins_win.atlas`, 贴图：`free_spins_win_popup.png`
  - 动画：`idle_win`, `start_win`
- `rays_skeleton` -> `assets/game/rhino/spine/giftspins_summary_popup_rays_skeleton`
  - 文件：`giftspins_summary_popup_rays_skeleton.skel`, `giftspins_summary_popup_rays_skeleton.atlas`, 贴图：`free_spins_win_popup.png`
  - 动画：`idle`, `start`

### 锦标赛 / Tournament 通用资源

- `cup` -> `assets/game/rhino/spine/tournaments_popup_cup`
  - 文件：`tournaments_popup_cup.skel`, `tournaments_popup_cup.atlas`, 贴图：`info_tnt.png`
  - 动画：`00_start`, `01_idle`
- `top_positions` -> `assets/game/rhino/spine/tournaments_popup_top_positions`
  - 文件：`tournaments_popup_top_positions.skel`, `tournaments_popup_top_positions.atlas`, 贴图：`info_tnt.png`
  - 动画：`00_start`, `01_idle`
- `cup` -> `assets/game/rhino/spine/tournaments_widget_cup`
  - 文件：`tournaments_widget_cup.skel`, `tournaments_widget_cup.atlas`, 贴图：`widget_tnt.png`
  - 动画：`00_start`, `00_start_idle`, `01_idle_results_win`, `01_start_results_win`
- `fire_frame` -> `assets/game/rhino/spine/tournaments_widget_fire_frame`
  - 文件：`tournaments_widget_fire_frame.skel`, `tournaments_widget_fire_frame.atlas`, 贴图：`widget_tnt.png`
  - 动画：`end_m`, `end_s`, `idle_m`, `idle_s`, `start_m`, `start_s`
- `info_panel` -> `assets/game/rhino/spine/tournaments_widget_info_panel`
  - 文件：`tournaments_widget_info_panel.skel`, `tournaments_widget_info_panel.atlas`, 贴图：`widget_tnt.png`
  - 动画：`00_idle`, `00_idle_calculation`, `00_start`, `01_last_min`, `01_timer`, `02_close_requirements`, `02_start_requirements`
- `widget_m` -> `assets/game/rhino/spine/tournaments_widget_widget_m`
  - 文件：`tournaments_widget_widget_m.skel`, `tournaments_widget_widget_m.atlas`, 贴图：`widget_tnt.png`
  - 动画：`00_start`, `00_start_idle`, `06_final_timer`, `04_board_2_down`, `04_board_2_idle`, `04_board_2_up_lvl2`, `05_board_3_down`, `05_board_3_down_top`, `05_board_3_idle`, `05_board_3_idle_top`, `05_board_3_up_top`, `05_board_3_up_lvl2`
- `widget_s` -> `assets/game/rhino/spine/tournaments_widget_widget_s`
  - 文件：`tournaments_widget_widget_s.skel`, `tournaments_widget_widget_s.atlas`, 贴图：`widget_tnt.png`
  - 动画：`00_start`, `00_start_idle`, `06_final_timer`, `04_board_2_down`, `04_board_2_idle`, `04_board_2_up_lvl2`, `05_board_3_down`, `05_board_3_down_top`, `05_board_3_idle`, `05_board_3_idle_top`, `05_board_3_up_top`, `05_board_3_up_lvl2`

### 中奖弹窗 Win Popup

- `cup` -> `assets/game/rhino/spine/tournaments_win_popup_cup`
  - 文件：`tournaments_win_popup_cup.skel`, `tournaments_win_popup_cup.atlas`, 贴图：`win_popup.png`
  - 动画：`00_start`, `01_idle`
- `flag` -> `assets/game/rhino/spine/tournaments_win_popup_flag`
  - 文件：`tournaments_win_popup_flag.skel`, `tournaments_win_popup_flag.atlas`, 贴图：`win_popup.png`
  - 动画：`00_start`, `01_idle`
- `popup` -> `assets/game/rhino/spine/win_popup_popup`
  - 文件：`win_popup_popup.skel`, `win_popup_popup.atlas`, 贴图：`win_popup.png`, `win_popup2.png`
  - 动画：`activation`, `deactivation`, `idle`
- `popup2` -> `assets/game/rhino/spine/win_popup_popup2`
  - 文件：`win_popup_popup2.skel`, `win_popup_popup2.atlas`, 贴图：`win_popup.png`, `win_popup2.png`
  - 动画：`activation`, `deactivation`, `idle`
- `popup3` -> `assets/game/rhino/spine/win_popup_popup3`
  - 文件：`win_popup_popup3.skel`, `win_popup_popup3.atlas`, 贴图：`win_popup.png`, `win_popup2.png`
  - 动画：`activation`, `deactivation`, `idle`
- `popup4` -> `assets/game/rhino/spine/win_popup_popup4`
  - 文件：`win_popup_popup4.skel`, `win_popup_popup4.atlas`, 贴图：`win_popup.png`, `win_popup2.png`
  - 动画：`activation`, `deactivation`, `idle`
- `popup5` -> `assets/game/rhino/spine/win_popup_popup5`
  - 文件：`win_popup_popup5.skel`, `win_popup_popup5.atlas`, 贴图：`win_popup.png`, `win_popup2.png`
  - 动画：`activation`, `deactivation`, `idle`
- `big_win` -> `assets/game/rhino/spine/bigwin_big_win`
  - 文件：`bigwin_big_win.skel`, `bigwin_big_win.atlas`, 贴图：`big_win.png`
  - 动画：`grand_win`, `royal_win`, `total_win1`, `total_win2`, `total_win3`

### 盘面特效 / Anticipation / Boost

- `anticipation_bg_fx` -> `assets/game/rhino/spine/anticipation_anticipation_bg_fx`
  - 文件：`anticipation_anticipation_bg_fx.skel`, `anticipation_anticipation_bg_fx.atlas`, 贴图：`anticipation.png`
  - 动画：`animation`
- `ante_bet_back` -> `assets/game/rhino/spine/reels_boost_antebet_ante_bet_back`
  - 文件：`reels_boost_antebet_ante_bet_back.skel`, `reels_boost_antebet_ante_bet_back.atlas`, 贴图：`reel_fx.png`
  - 动画：`loop`, `start`
- `ante_bet_front` -> `assets/game/rhino/spine/reels_boost_antebet_ante_bet_front`
  - 文件：`reels_boost_antebet_ante_bet_front.skel`, `reels_boost_antebet_ante_bet_front.atlas`, 贴图：`reel_fx.png`
  - 动画：`loop`, `start`
- `anticipation_grand` -> `assets/game/rhino/spine/reels_boost_antebet_anticipation_grand`
  - 文件：`reels_boost_antebet_anticipation_grand.skel`, `reels_boost_antebet_anticipation_grand.atlas`, 贴图：`reel_fx.png`
  - 动画：`in`, `loop`, `out`
- `anticipation` -> `assets/game/rhino/spine/reels_boost_antebet_anticipation`
  - 文件：`reels_boost_antebet_anticipation.skel`, `reels_boost_antebet_anticipation.atlas`, 贴图：`reel_fx.png`
  - 动画：`in`, `loop`, `out`
- `boost_fx` -> `assets/game/rhino/spine/reels_boost_antebet_boost_fx`
  - 文件：`reels_boost_antebet_boost_fx.skel`, `reels_boost_antebet_boost_fx.atlas`, 贴图：`reel_fx.png`
  - 动画：`collect_in`, `collect_loop`, `collect_out`
- `reel_fx_back` -> `assets/game/rhino/spine/reels_boost_antebet_reel_fx_back`
  - 文件：`reels_boost_antebet_reel_fx_back.skel`, `reels_boost_antebet_reel_fx_back.atlas`, 贴图：`reel_fx.png`
  - 动画：`action`, `action_expand`, `expand`, `idle`
- `reel_fx_top` -> `assets/game/rhino/spine/reels_boost_antebet_reel_fx_top`
  - 文件：`reels_boost_antebet_reel_fx_top.skel`, `reels_boost_antebet_reel_fx_top.atlas`, 贴图：`reel_fx.png`
  - 动画：`action`, `action_expand`, `expand`, `idle`

### 主画面背景与角色 Background / Character

- `bg_bonus_back` -> `assets/game/rhino/spine/background_bg_bonus_back`
  - 文件：`background_bg_bonus_back.skel`, `background_bg_bonus_back.atlas`, 贴图：`background.png`
  - 动画：`event`, `idle`
- `bg_bonus_front` -> `assets/game/rhino/spine/background_bg_bonus_front`
  - 文件：`background_bg_bonus_front.skel`, `background_bg_bonus_front.atlas`, 贴图：`background.png`
  - 动画：`event`, `idle`
- `bg_main_back` -> `assets/game/rhino/spine/background_bg_main_back`
  - 文件：`background_bg_main_back.skel`, `background_bg_main_back.atlas`, 贴图：`background.png`
  - 动画：`event`, `idle`
- `bg_main_front` -> `assets/game/rhino/spine/background_bg_main_front`
  - 文件：`background_bg_main_front.skel`, `background_bg_main_front.atlas`, 贴图：`background.png`
  - 动画：`event`, `idle`
- `top_rhino_main` -> `assets/game/rhino/spine/character_top_rhino_main`
  - 文件：`character_top_rhino_main.skel`, `character_top_rhino_main.atlas`, 贴图：`top_rhino_main.png`
  - 动画：`extra_bonus_give_coins`, `extra_bonus_hit`, `extra_bonus_react`, `hit`, `hit2`, `idle_loop`, `idle_react`, `random_bonus`, `sticky`, `sticky_add`, `tint_in`, `tint_out`
- `top_rhino_bonus` -> `assets/game/rhino/spine/characterBonus_top_rhino_bonus`
  - 文件：`characterBonus_top_rhino_bonus.skel`, `characterBonus_top_rhino_bonus.atlas`, 贴图：`top_rhino_bonus.png`
  - 动画：`idle_dust`, `idle_fx_1`, `idle_fx_2`, `idle_fx_3`, `idle_loop`, `multi`, `react`, `shake`, `tint_in`, `tint_out`, `total_win`, `total_win_loop`

### Logo 与 Jackpot 面板

- `grand` -> `assets/game/rhino/spine/logo_jackpots_grand`
  - 文件：`logo_jackpots_grand.skel`, `logo_jackpots_grand.atlas`, 贴图：`UI.png`
  - 动画：`counter_activation`, `idle`, `idle_bonus`, `win`, `win_bonus`
- `logo` -> `assets/game/rhino/spine/logo_jackpots_logo`
  - 文件：`logo_jackpots_logo.skel`, `logo_jackpots_logo.atlas`, 贴图：`UI.png`
  - 动画：`idle_land`, `idle_port`
- `major` -> `assets/game/rhino/spine/logo_jackpots_major`
  - 文件：`logo_jackpots_major.skel`, `logo_jackpots_major.atlas`, 贴图：`UI.png`
  - 动画：`idle`, `win`
- `mini` -> `assets/game/rhino/spine/logo_jackpots_mini`
  - 文件：`logo_jackpots_mini.skel`, `logo_jackpots_mini.atlas`, 贴图：`UI.png`
  - 动画：`idle`, `win`
- `minor` -> `assets/game/rhino/spine/logo_jackpots_minor`
  - 文件：`logo_jackpots_minor.skel`, `logo_jackpots_minor.atlas`, 贴图：`UI.png`
  - 动画：`idle`, `win`
- `reel_back` -> `assets/game/rhino/spine/logo_jackpots_reel_back`
  - 文件：`logo_jackpots_reel_back.skel`, `logo_jackpots_reel_back.atlas`, 贴图：`UI.png`
  - 动画：`expand`, `idle`
- `reel_frame` -> `assets/game/rhino/spine/logo_jackpots_reel_frame`
  - 文件：`logo_jackpots_reel_frame.skel`, `logo_jackpots_reel_frame.atlas`, 贴图：`UI.png`
  - 动画：`expand`, `idle`
- `royal` -> `assets/game/rhino/spine/logo_jackpots_royal`
  - 文件：`logo_jackpots_royal.skel`, `logo_jackpots_royal.atlas`, 贴图：`UI.png`
  - 动画：`counter_activation`, `idle`, `idle_bonus`, `win`, `win_bonus`

### Bonus / Respin / Total Win 面板

- `multiplier_value` -> `assets/game/rhino/spine/multiplier_respin_totalwin_multiplier_value`
  - 文件：`multiplier_respin_totalwin_multiplier_value.skel`, `multiplier_respin_totalwin_multiplier_value.atlas`, 贴图：`UI_bonus.png`
  - 动画：`appear`, `increase`, `multiply`
- `respin_panel` -> `assets/game/rhino/spine/multiplier_respin_totalwin_respin_panel`
  - 文件：`multiplier_respin_totalwin_respin_panel.skel`, `multiplier_respin_totalwin_respin_panel.atlas`, 贴图：`UI_bonus.png`
  - 动画：`1_end`, `1_start`, `1_static`, `2_end`, `2_start`, `2_static`, `3_end`, `3_start`, `3_static`, `end`, `start`
- `total_win` -> `assets/game/rhino/spine/multiplier_respin_totalwin_total_win`
  - 文件：`multiplier_respin_totalwin_total_win.skel`, `multiplier_respin_totalwin_total_win.atlas`, 贴图：`UI_bonus.png`
  - 动画：`activation`, `win`

### 盘面符号 Symbols

- `boost` -> `assets/game/rhino/spine/symbols_boost`
  - 文件：`symbols_boost.skel`, `symbols_boost.atlas`, 贴图：`symbols.png`
  - 动画：`appearance`, `burst`, `collect`, `collect_3x3`, `dispatch`, `fall`, `idle`, `multiply`, `sticky_appear`, `sticky_disappear`, `sticky_idle`, `trigger`
- `coin` -> `assets/game/rhino/spine/symbols_coin`
  - 文件：`symbols_coin.skel`, `symbols_coin.atlas`, 贴图：`symbols.png`
  - 动画：`appear`, `dispatch`, `fall`, `idle`, `multiply`, `sticky_appear`, `sticky_disappear`, `sticky_idle`, `trigger`
- `mystery_coin` -> `assets/game/rhino/spine/symbols_mystery_coin`
  - 文件：`symbols_mystery_coin.skel`, `symbols_mystery_coin.atlas`, 贴图：`symbols.png`
  - 动画：`appear`, `fall`, `idle`, `reveal_in`, `reveal_loop`, `reveal_out`, `sticky_appear`, `sticky_disappear`, `sticky_idle`, `trigger`
- `mystery_rhino` -> `assets/game/rhino/spine/symbols_mystery_rhino`
  - 文件：`symbols_mystery_rhino.skel`, `symbols_mystery_rhino.atlas`, 贴图：`symbols.png`
  - 动画：`appear`, `fall`, `idle`, `reveal_in`, `reveal_loop`, `reveal_out`, `sticky_appear`, `sticky_disappear`, `sticky_idle`, `trigger`
- `rhino_jackpot` -> `assets/game/rhino/spine/symbols_rhino_jackpot`
  - 文件：`symbols_rhino_jackpot.skel`, `symbols_rhino_jackpot.atlas`, 贴图：`symbols.png`
  - 动画：`appear`, `dispatch`, `fall`, `idle`, `jp_win`, `multiply`, `trigger`, `win`
- `rhino` -> `assets/game/rhino/spine/symbols_rhino`
  - 文件：`symbols_rhino.skel`, `symbols_rhino.atlas`, 贴图：`symbols.png`
  - 动画：`appear`, `dispatch`, `fall`, `idle`, `multiply`, `mystery_reveal`, `sticky_appear`, `sticky_disappear`, `sticky_idle`, `trigger`, `win`
- `sticky_lightning` -> `assets/game/rhino/spine/symbols_sticky_lightning`
  - 文件：`symbols_sticky_lightning.skel`, `symbols_sticky_lightning.atlas`, 贴图：`symbols.png`
  - 动画：`sticky`
- `sticky_timer` -> `assets/game/rhino/spine/symbols_sticky_timer`
  - 文件：`symbols_sticky_timer.skel`, `symbols_sticky_timer.atlas`, 贴图：`symbols.png`
  - 动画：`sticky_appear`, `sticky_count`, `sticky_disappear`, `sticky_idle`
- `super_coin` -> `assets/game/rhino/spine/symbols_super_coin`
  - 文件：`symbols_super_coin.skel`, `symbols_super_coin.atlas`, 贴图：`symbols.png`
  - 动画：`idle`, `land`, `transform`, `trigger`
- `super_rhino` -> `assets/game/rhino/spine/symbols_super_rhino`
  - 文件：`symbols_super_rhino.skel`, `symbols_super_rhino.atlas`, 贴图：`symbols.png`
  - 动画：`idle`, `land`, `transform`, `trigger`

