import { useState, useEffect, useCallback, useRef } from "react";

const PRELOADED = [
  {id:"pre_0",word:"GOAT",meaning:"史上最高（Greatest Of All Time）",category:"スラング",level:2,phonetic:"",audioUS:"",audioUK:"",examples:["He's the GOAT of basketball.","That pizza place is the GOAT."],image:"",srs:{},history:[],createdAt:1777887506629},
  {id:"pre_1",word:"vibe",meaning:"雰囲気、ノリ、フィーリング",category:"スラング",level:1,phonetic:"",audioUS:"",audioUK:"",examples:["This place has such a good vibe.","I'm not really vibing with this music."],image:"",srs:{},history:[],createdAt:1777887566629},
  {id:"pre_2",word:"no cap",meaning:"マジで、嘘じゃなく",category:"スラング",level:2,phonetic:"",audioUS:"",audioUK:"",examples:["That was the best meal, no cap.","No cap, she's the smartest person I know."],image:"",srs:{},history:[],createdAt:1777887626629},
  {id:"pre_3",word:"lowkey",meaning:"ひそかに、実は、わりと",category:"スラング",level:1,phonetic:"",audioUS:"",audioUK:"",examples:["I lowkey love this song.","I'm lowkey nervous about the interview."],image:"",srs:{},history:[],createdAt:1777887686629},
  {id:"pre_4",word:"highkey",meaning:"めちゃくちゃ、完全に",category:"スラング",level:2,phonetic:"",audioUS:"",audioUK:"",examples:["I highkey love this show.","I'm highkey obsessed with this."],image:"",srs:{},history:[],createdAt:1777887746629},
  {id:"pre_5",word:"slay",meaning:"最高にこなす、決める",category:"スラング",level:2,phonetic:"",audioUS:"",audioUK:"",examples:["She absolutely slayed that presentation.","You're slaying in that outfit!"],image:"",srs:{},history:[],createdAt:1777887806629},
  {id:"pre_6",word:"lit",meaning:"最高、盛り上がってる",category:"スラング",level:1,phonetic:"",audioUS:"",audioUK:"",examples:["That concert was absolutely lit!","The party last night was so lit."],image:"",srs:{},history:[],createdAt:1777887866629},
  {id:"pre_7",word:"bussin",meaning:"めちゃくちゃうまい（食べ物）",category:"スラング",level:3,phonetic:"",audioUS:"",audioUK:"",examples:["This ramen is bussin!","Her cooking is always bussin."],image:"",srs:{},history:[],createdAt:1777887926629},
  {id:"pre_8",word:"sus",meaning:"怪しい、疑わしい",category:"スラング",level:2,phonetic:"",audioUS:"",audioUK:"",examples:["That guy seems pretty sus.","Something about this deal is sus."],image:"",srs:{},history:[],createdAt:1777887986629},
  {id:"pre_9",word:"flex",meaning:"見せびらかす、自慢する",category:"スラング",level:2,phonetic:"",audioUS:"",audioUK:"",examples:["He's always flexing his new car.","That's a big flex, man."],image:"",srs:{},history:[],createdAt:1777888046629},
  {id:"pre_10",word:"clout",meaning:"影響力、名声、人気",category:"スラング",level:3,phonetic:"",audioUS:"",audioUK:"",examples:["She has a lot of clout in the industry.","He's chasing clout on social media."],image:"",srs:{},history:[],createdAt:1777888106629},
  {id:"pre_11",word:"tea",meaning:"ゴシップ、噂話、真相",category:"スラング",level:2,phonetic:"",audioUS:"",audioUK:"",examples:["Spill the tea! What happened?","That's the real tea right there."],image:"",srs:{},history:[],createdAt:1777888166629},
  {id:"pre_12",word:"extra",meaning:"やりすぎ、大げさ",category:"スラング",level:2,phonetic:"",audioUS:"",audioUK:"",examples:["She's being so extra about this.","Stop being extra — it's just a small mistake."],image:"",srs:{},history:[],createdAt:1777888226629},
  {id:"pre_13",word:"salty",meaning:"むかついてる、プリプリしてる",category:"スラング",level:2,phonetic:"",audioUS:"",audioUK:"",examples:["Why are you so salty about losing?","Don't be salty — it's just a game."],image:"",srs:{},history:[],createdAt:1777888286629},
  {id:"pre_14",word:"bet",meaning:"了解、わかった、まじで",category:"スラング",level:2,phonetic:"",audioUS:"",audioUK:"",examples:["Can you pick me up at 7? Bet.","Bet, sounds good to me."],image:"",srs:{},history:[],createdAt:1777888346629},
  {id:"pre_15",word:"ghost",meaning:"突然連絡を絶つ",category:"スラング",level:2,phonetic:"",audioUS:"",audioUK:"",examples:["He ghosted me after three dates.","Don't ghost people — it's rude."],image:"",srs:{},history:[],createdAt:1777888406629},
  {id:"pre_16",word:"FOMO",meaning:"乗り遅れ恐怖症（Fear Of Missing Out）",category:"スラング",level:2,phonetic:"",audioUS:"",audioUK:"",examples:["I have serious FOMO about that festival.","Don't let FOMO control your decisions."],image:"",srs:{},history:[],createdAt:1777888466629},
  {id:"pre_17",word:"cringey",meaning:"見ていて恥ずかしい、痛い",category:"スラング",level:2,phonetic:"",audioUS:"",audioUK:"",examples:["That ad is so cringey.","His attempt to be cool was cringey."],image:"",srs:{},history:[],createdAt:1777888526629},
  {id:"pre_18",word:"shade",meaning:"嫌みを言う、陰口",category:"スラング",level:3,phonetic:"",audioUS:"",audioUK:"",examples:["She threw shade at her coworker.","Don't throw shade — just say what you mean."],image:"",srs:{},history:[],createdAt:1777888586629},
  {id:"pre_19",word:"basic",meaning:"ありふれた、没個性",category:"スラング",level:2,phonetic:"",audioUS:"",audioUK:"",examples:["That's so basic.","Nothing wrong with being a little basic."],image:"",srs:{},history:[],createdAt:1777888646629},
  {id:"pre_20",word:"fire",meaning:"最高、かっこいい",category:"スラング",level:1,phonetic:"",audioUS:"",audioUK:"",examples:["That track is straight fire.","Your outfit is fire today."],image:"",srs:{},history:[],createdAt:1777888706629},
  {id:"pre_21",word:"drip",meaning:"おしゃれなファッション・スタイル",category:"スラング",level:3,phonetic:"",audioUS:"",audioUK:"",examples:["His drip is always on point.","She walked in with serious drip."],image:"",srs:{},history:[],createdAt:1777888766629},
  {id:"pre_22",word:"cap",meaning:"嘘をつく（no capの反対）",category:"スラング",level:2,phonetic:"",audioUS:"",audioUK:"",examples:["Stop capping — that never happened.","Are you capping right now?"],image:"",srs:{},history:[],createdAt:1777888826629},
  {id:"pre_23",word:"woke",meaning:"社会問題に意識の高い",category:"スラング",level:3,phonetic:"",audioUS:"",audioUK:"",examples:["He's very woke about social issues.","Stay woke."],image:"",srs:{},history:[],createdAt:1777888886629},
  {id:"pre_24",word:"rizz",meaning:"モテオーラ、異性を惹きつける力",category:"スラング",level:3,phonetic:"",audioUS:"",audioUK:"",examples:["He has serious rizz.","She walked in with rizz."],image:"",srs:{},history:[],createdAt:1777888946629},
  {id:"pre_25",word:"snatched",meaning:"完璧な体型・スタイル",category:"スラング",level:3,phonetic:"",audioUS:"",audioUK:"",examples:["Your eyebrows are snatched.","She looks snatched in that dress."],image:"",srs:{},history:[],createdAt:1777889006629},
  {id:"pre_26",word:"glow up",meaning:"外見・内面が劇的に良くなる",category:"スラング",level:2,phonetic:"",audioUS:"",audioUK:"",examples:["She had a major glow up over the summer.","That glow up is real."],image:"",srs:{},history:[],createdAt:1777889066629},
  {id:"pre_27",word:"stan",meaning:"熱狂的ファン、崇拝する",category:"スラング",level:2,phonetic:"",audioUS:"",audioUK:"",examples:["I stan this artist so hard.","She stans that show religiously."],image:"",srs:{},history:[],createdAt:1777889126629},
  {id:"pre_28",word:"periodt",meaning:"これ以上言うことなし（強調）",category:"スラング",level:3,phonetic:"",audioUS:"",audioUK:"",examples:["That's the best show ever, periodt.","She's the best, periodt."],image:"",srs:{},history:[],createdAt:1777889186629},
  {id:"pre_29",word:"understood the assignment",meaning:"完璧にこなした",category:"スラング",level:3,phonetic:"",audioUS:"",audioUK:"",examples:["She really understood the assignment tonight.","He understood the assignment completely."],image:"",srs:{},history:[],createdAt:1777889246629},
  {id:"pre_30",word:"it's giving",meaning:"〜な雰囲気がある",category:"スラング",level:3,phonetic:"",audioUS:"",audioUK:"",examples:["This outfit is giving CEO energy.","The vibe is giving summer vacation."],image:"",srs:{},history:[],createdAt:1777889306629},
  {id:"pre_31",word:"main character",meaning:"主人公エネルギー、自分が主役",category:"スラング",level:3,phonetic:"",audioUS:"",audioUK:"",examples:["She's giving main character energy.","You're such a main character."],image:"",srs:{},history:[],createdAt:1777889366629},
  {id:"pre_32",word:"era",meaning:"〜な時期、フェーズ",category:"スラング",level:2,phonetic:"",audioUS:"",audioUK:"",examples:["I'm in my healthy era.","She's in her boss era."],image:"",srs:{},history:[],createdAt:1777889426629},
  {id:"pre_33",word:"red flag",meaning:"危険なサイン、要注意",category:"スラング",level:2,phonetic:"",audioUS:"",audioUK:"",examples:["That's a major red flag.","He shows so many red flags."],image:"",srs:{},history:[],createdAt:1777889486629},
  {id:"pre_34",word:"green flag",meaning:"良いサイン、安心できる",category:"スラング",level:2,phonetic:"",audioUS:"",audioUK:"",examples:["He always texts back — green flag.","She's punctual, that's a green flag."],image:"",srs:{},history:[],createdAt:1777889546629},
  {id:"pre_35",word:"situationship",meaning:"曖昧な恋愛関係",category:"スラング",level:3,phonetic:"",audioUS:"",audioUK:"",examples:["We're in a situationship right now.","I'm tired of this situationship."],image:"",srs:{},history:[],createdAt:1777889606629},
  {id:"pre_36",word:"delulu",meaning:"妄想している、非現実的",category:"スラング",level:3,phonetic:"",audioUS:"",audioUK:"",examples:["She's being totally delulu about him.","That's delulu thinking."],image:"",srs:{},history:[],createdAt:1777889666629},
  {id:"pre_37",word:"W",meaning:"勝ち、いい結果",category:"スラング",level:1,phonetic:"",audioUS:"",audioUK:"",examples:["That's a huge W for the team.","Absolute W move."],image:"",srs:{},history:[],createdAt:1777889726629},
  {id:"pre_38",word:"L",meaning:"負け、失敗",category:"スラング",level:1,phonetic:"",audioUS:"",audioUK:"",examples:["Taking an L on that decision.","That's a big L."],image:"",srs:{},history:[],createdAt:1777889786629},
  {id:"pre_39",word:"mid",meaning:"普通、可もなく不可もなく",category:"スラング",level:2,phonetic:"",audioUS:"",audioUK:"",examples:["That movie was mid at best.","The food was honestly mid."],image:"",srs:{},history:[],createdAt:1777889846629},
  {id:"pre_40",word:"based",meaning:"自分の信念を曲げない、かっこいい",category:"スラング",level:3,phonetic:"",audioUS:"",audioUK:"",examples:["That opinion is based.","He's so based for saying that."],image:"",srs:{},history:[],createdAt:1777889906629},
  {id:"pre_41",word:"NPC",meaning:"主体性のない人（ゲームの脇役キャラ）",category:"スラング",level:3,phonetic:"",audioUS:"",audioUK:"",examples:["He's such an NPC in social situations.","Stop being an NPC."],image:"",srs:{},history:[],createdAt:1777889966629},
  {id:"pre_42",word:"unhinged",meaning:"ぶっ飛んでる、クレイジー",category:"スラング",level:3,phonetic:"",audioUS:"",audioUK:"",examples:["That response was completely unhinged.","She went full unhinged mode."],image:"",srs:{},history:[],createdAt:1777890026629},
  {id:"pre_43",word:"gaslit",meaning:"ガスライティングされた",category:"スラング",level:3,phonetic:"",audioUS:"",audioUK:"",examples:["I felt completely gaslit after that.","He gaslit her into thinking it was her fault."],image:"",srs:{},history:[],createdAt:1777890086629},
  {id:"pre_44",word:"toxic",meaning:"有害な、関係などがよくない",category:"スラング",level:2,phonetic:"",audioUS:"",audioUK:"",examples:["That relationship was so toxic.","Toxic behavior isn't okay."],image:"",srs:{},history:[],createdAt:1777890146629},
  {id:"pre_45",word:"wholesome",meaning:"心が温まる、純粋でかわいい",category:"スラング",level:2,phonetic:"",audioUS:"",audioUK:"",examples:["That video is so wholesome.","Their friendship is the most wholesome thing."],image:"",srs:{},history:[],createdAt:1777890206629},
  {id:"pre_46",word:"shook",meaning:"衝撃を受けた、驚いた",category:"スラング",level:2,phonetic:"",audioUS:"",audioUK:"",examples:["I was absolutely shook by that news.","She's shook after that game."],image:"",srs:{},history:[],createdAt:1777890266629},
  {id:"pre_47",word:"iconic",meaning:"伝説的、忘れられない",category:"スラング",level:2,phonetic:"",audioUS:"",audioUK:"",examples:["That performance was iconic.","She's iconic — there's no one like her."],image:"",srs:{},history:[],createdAt:1777890326629},
  {id:"pre_48",word:"hyped",meaning:"超興奮してる",category:"スラング",level:2,phonetic:"",audioUS:"",audioUK:"",examples:["I'm so hyped for this concert.","Everyone's hyped about the new movie."],image:"",srs:{},history:[],createdAt:1777890386629},
  {id:"pre_49",word:"simp",meaning:"好きな人に過度に尽くす人",category:"スラング",level:3,phonetic:"",audioUS:"",audioUK:"",examples:["He's simping hard for her.","Don't simp — have some self-respect."],image:"",srs:{},history:[],createdAt:1777890446629},
  {id:"pre_50",word:"clutch",meaning:"ここ一番で決める",category:"スラング",level:2,phonetic:"",audioUS:"",audioUK:"",examples:["That was a clutch play.","She's always clutch under pressure."],image:"",srs:{},history:[],createdAt:1777890506629},
  {id:"pre_51",word:"ngl",meaning:"正直に言うと（not gonna lie）",category:"スラング",level:2,phonetic:"",audioUS:"",audioUK:"",examples:["Ngl, that was actually pretty good.","Ngl I was a little scared."],image:"",srs:{},history:[],createdAt:1777890566629},
  {id:"pre_52",word:"ick",meaning:"急に相手が嫌になる感覚",category:"スラング",level:3,phonetic:"",audioUS:"",audioUK:"",examples:["He gave me the ick when he did that.","I got the ick and couldn't ignore it."],image:"",srs:{},history:[],createdAt:1777890626629},
  {id:"pre_53",word:"big mood",meaning:"すごく共感できる",category:"スラング",level:2,phonetic:"",audioUS:"",audioUK:"",examples:["Going to bed at 9 PM — big mood.","That photo is a big mood."],image:"",srs:{},history:[],createdAt:1777890686629},
  {id:"pre_54",word:"real talk",meaning:"本気で言うけど、マジで",category:"スラング",level:2,phonetic:"",audioUS:"",audioUK:"",examples:["Real talk, you need to sleep more.","Real talk — she's amazing."],image:"",srs:{},history:[],createdAt:1777890746629},
  {id:"pre_55",word:"say less",meaning:"了解、それ以上言わなくていい",category:"スラング",level:2,phonetic:"",audioUS:"",audioUK:"",examples:["You're buying dinner? Say less.","Say less — I'll be there."],image:"",srs:{},history:[],createdAt:1777890806629},
  {id:"pre_56",word:"on god",meaning:"マジで、神に誓って",category:"スラング",level:3,phonetic:"",audioUS:"",audioUK:"",examples:["On god, that was the funniest thing.","On god I didn't know."],image:"",srs:{},history:[],createdAt:1777890866629},
  {id:"pre_57",word:"sending me",meaning:"笑い死にしそう",category:"スラング",level:3,phonetic:"",audioUS:"",audioUK:"",examples:["This video is sending me.","That meme sent me."],image:"",srs:{},history:[],createdAt:1777890926629},
  {id:"pre_58",word:"rent free",meaning:"頭から離れない",category:"スラング",level:2,phonetic:"",audioUS:"",audioUK:"",examples:["That song is living rent free in my head.","He's been living rent free in her mind."],image:"",srs:{},history:[],createdAt:1777890986629},
  {id:"pre_59",word:"caught feelings",meaning:"恋心が芽生えた",category:"スラング",level:2,phonetic:"",audioUS:"",audioUK:"",examples:["I think I caught feelings for him.","She caught feelings way too fast."],image:"",srs:{},history:[],createdAt:1777891046629},
  {id:"pre_60",word:"no shot",meaning:"ありえない、まじか",category:"スラング",level:2,phonetic:"",audioUS:"",audioUK:"",examples:["No shot they actually did that.","No shot I'm going to that party."],image:"",srs:{},history:[],createdAt:1777891106629},
  {id:"pre_61",word:"deadass",meaning:"マジで、本当に",category:"スラング",level:3,phonetic:"",audioUS:"",audioUK:"",examples:["Deadass, I would do that.","Are you deadass right now?"],image:"",srs:{},history:[],createdAt:1777891166629},
  {id:"pre_62",word:"ate that",meaning:"完璧にこなした",category:"スラング",level:3,phonetic:"",audioUS:"",audioUK:"",examples:["She ate that performance and left no crumbs.","He absolutely ate that presentation."],image:"",srs:{},history:[],createdAt:1777891226629},
  {id:"pre_63",word:"understood",meaning:"わかった、了解（強い合意）",category:"スラング",level:1,phonetic:"",audioUS:"",audioUK:"",examples:["Understood. I'll get it done.","Understood — say no more."],image:"",srs:{},history:[],createdAt:1777891286629},
  {id:"pre_64",word:"pressed",meaning:"イライラしてる、必死になってる",category:"スラング",level:2,phonetic:"",audioUS:"",audioUK:"",examples:["Why are you so pressed about this?","She's pressed for no reason."],image:"",srs:{},history:[],createdAt:1777891346629},
  {id:"pre_65",word:"hits different",meaning:"いつもと違う特別な感じがする",category:"スラング",level:2,phonetic:"",audioUS:"",audioUK:"",examples:["This song hits different at midnight.","Coffee hits different on a cold morning."],image:"",srs:{},history:[],createdAt:1777891406629},
  {id:"pre_66",word:"that's facts",meaning:"それは事実、全くその通り",category:"スラング",level:1,phonetic:"",audioUS:"",audioUK:"",examples:["That's facts — no one works harder.","That's facts, no cap."],image:"",srs:{},history:[],createdAt:1777891466629},
  {id:"pre_67",word:"chill out",meaning:"落ち着く、リラックスする",category:"口語表現",level:1,phonetic:"",audioUS:"",audioUK:"",examples:["Chill out, it's not a big deal.","He needs to chill out."],image:"",srs:{},history:[],createdAt:1777891526629},
  {id:"pre_68",word:"hang out",meaning:"つるむ、一緒に過ごす",category:"口語表現",level:1,phonetic:"",audioUS:"",audioUK:"",examples:["Want to hang out this weekend?","We hang out every Friday."],image:"",srs:{},history:[],createdAt:1777891586629},
  {id:"pre_69",word:"grab a bite",meaning:"軽く食事する",category:"口語表現",level:1,phonetic:"",audioUS:"",audioUK:"",examples:["Want to grab a bite after work?","Let's grab a bite — I'm starving."],image:"",srs:{},history:[],createdAt:1777891646629},
  {id:"pre_70",word:"catch up",meaning:"近況報告する、遅れを取り戻す",category:"口語表現",level:1,phonetic:"",audioUS:"",audioUK:"",examples:["We should catch up over coffee.","I need to catch up on sleep."],image:"",srs:{},history:[],createdAt:1777891706629},
  {id:"pre_71",word:"hit me up",meaning:"連絡して",category:"口語表現",level:2,phonetic:"",audioUS:"",audioUK:"",examples:["Hit me up when you're free.","If you need anything, hit me up."],image:"",srs:{},history:[],createdAt:1777891766629},
  {id:"pre_72",word:"what's up",meaning:"やあ、どうした",category:"口語表現",level:1,phonetic:"",audioUS:"",audioUK:"",examples:["Hey, what's up?","What's up with you lately?"],image:"",srs:{},history:[],createdAt:1777891826629},
  {id:"pre_73",word:"for real",meaning:"マジで、本当に",category:"口語表現",level:1,phonetic:"",audioUS:"",audioUK:"",examples:["For real, that was incredible.","Are you serious? For real?"],image:"",srs:{},history:[],createdAt:1777891886629},
  {id:"pre_74",word:"no worries",meaning:"大丈夫、気にしないで",category:"口語表現",level:1,phonetic:"",audioUS:"",audioUK:"",examples:["Sorry I'm late! No worries.","No worries — it happens."],image:"",srs:{},history:[],createdAt:1777891946629},
  {id:"pre_75",word:"my bad",meaning:"私のミス",category:"口語表現",level:1,phonetic:"",audioUS:"",audioUK:"",examples:["Oh, my bad — I forgot.","Totally my bad for the confusion."],image:"",srs:{},history:[],createdAt:1777892006629},
  {id:"pre_76",word:"just kidding",meaning:"冗談だよ",category:"口語表現",level:1,phonetic:"",audioUS:"",audioUK:"",examples:["Just kidding, you're actually great.","I hate Mondays — just kidding."],image:"",srs:{},history:[],createdAt:1777892066629},
  {id:"pre_77",word:"totally",meaning:"完全に、全くその通り",category:"口語表現",level:1,phonetic:"",audioUS:"",audioUK:"",examples:["I totally agree with you.","I totally forgot about the meeting."],image:"",srs:{},history:[],createdAt:1777892126629},
  {id:"pre_78",word:"kind of",meaning:"ちょっと、まあ",category:"口語表現",level:1,phonetic:"",audioUS:"",audioUK:"",examples:["I'm kind of tired today.","That's kind of rude."],image:"",srs:{},history:[],createdAt:1777892186629},
  {id:"pre_79",word:"I'm down",meaning:"賛成、乗った",category:"口語表現",level:2,phonetic:"",audioUS:"",audioUK:"",examples:["Want to grab sushi? I'm down.","Count me in — I'm down."],image:"",srs:{},history:[],createdAt:1777892246629},
  {id:"pre_80",word:"on point",meaning:"完璧、ばっちり",category:"口語表現",level:2,phonetic:"",audioUS:"",audioUK:"",examples:["Your presentation was on point.","Her style is always on point."],image:"",srs:{},history:[],createdAt:1777892306629},
  {id:"pre_81",word:"heads up",meaning:"事前に知らせる",category:"口語表現",level:2,phonetic:"",audioUS:"",audioUK:"",examples:["Just a heads up — the meeting moved.","Thanks for the heads up!"],image:"",srs:{},history:[],createdAt:1777892366629},
  {id:"pre_82",word:"no big deal",meaning:"大したことない",category:"口語表現",level:1,phonetic:"",audioUS:"",audioUK:"",examples:["It's really no big deal.","Missing one class is no big deal."],image:"",srs:{},history:[],createdAt:1777892426629},
  {id:"pre_83",word:"figured out",meaning:"解決した、わかった",category:"口語表現",level:1,phonetic:"",audioUS:"",audioUK:"",examples:["I finally figured it out!","Did you figure out the problem?"],image:"",srs:{},history:[],createdAt:1777892486629},
  {id:"pre_84",word:"at the end of the day",meaning:"結局のところ",category:"口語表現",level:2,phonetic:"",audioUS:"",audioUK:"",examples:["At the end of the day, it's your choice.","At the end of the day, happiness matters."],image:"",srs:{},history:[],createdAt:1777892546629},
  {id:"pre_85",word:"long story short",meaning:"かいつまんで言うと",category:"口語表現",level:2,phonetic:"",audioUS:"",audioUK:"",examples:["Long story short, I missed the flight.","Long story short, we won."],image:"",srs:{},history:[],createdAt:1777892606629},
  {id:"pre_86",word:"for sure",meaning:"もちろん、確実に",category:"口語表現",level:1,phonetic:"",audioUS:"",audioUK:"",examples:["For sure — I'll be there.","That's for sure."],image:"",srs:{},history:[],createdAt:1777892666629},
  {id:"pre_87",word:"I feel you",meaning:"わかる、共感する",category:"口語表現",level:2,phonetic:"",audioUS:"",audioUK:"",examples:["I feel you — work has been crazy.","I feel you, it's been tough."],image:"",srs:{},history:[],createdAt:1777892726629},
  {id:"pre_88",word:"fair point",meaning:"それはもっともだ",category:"口語表現",level:2,phonetic:"",audioUS:"",audioUK:"",examples:["Fair point — I didn't think of that.","That's a fair point."],image:"",srs:{},history:[],createdAt:1777892786629},
  {id:"pre_89",word:"good call",meaning:"いい判断",category:"口語表現",level:2,phonetic:"",audioUS:"",audioUK:"",examples:["Leaving early was a good call.","Good call on bringing an umbrella."],image:"",srs:{},history:[],createdAt:1777892846629},
  {id:"pre_90",word:"honestly",meaning:"正直に言うと",category:"口語表現",level:1,phonetic:"",audioUS:"",audioUK:"",examples:["Honestly, I didn't expect that.","Honestly? I'm a little disappointed."],image:"",srs:{},history:[],createdAt:1777892906629},
  {id:"pre_91",word:"basically",meaning:"要するに",category:"口語表現",level:1,phonetic:"",audioUS:"",audioUK:"",examples:["Basically, we need to start over.","It's basically the same thing."],image:"",srs:{},history:[],createdAt:1777892966629},
  {id:"pre_92",word:"literally",meaning:"文字通り、マジで（強調）",category:"口語表現",level:1,phonetic:"",audioUS:"",audioUK:"",examples:["I literally just got home.","This is literally the best day ever."],image:"",srs:{},history:[],createdAt:1777893026629},
  {id:"pre_93",word:"I mean",meaning:"つまり、えっと",category:"口語表現",level:1,phonetic:"",audioUS:"",audioUK:"",examples:["I mean, it's not perfect but it works.","I mean, what did you expect?"],image:"",srs:{},history:[],createdAt:1777893086629},
  {id:"pre_94",word:"the thing is",meaning:"問題はね、実は",category:"口語表現",level:2,phonetic:"",audioUS:"",audioUK:"",examples:["The thing is, I already knew.","The thing is, it's more complicated."],image:"",srs:{},history:[],createdAt:1777893146629},
  {id:"pre_95",word:"look",meaning:"いいか、聞いて",category:"口語表現",level:1,phonetic:"",audioUS:"",audioUK:"",examples:["Look, I understand your frustration.","Look, we need to talk."],image:"",srs:{},history:[],createdAt:1777893206629},
  {id:"pre_96",word:"here's the thing",meaning:"これがポイントなんだけど",category:"口語表現",level:2,phonetic:"",audioUS:"",audioUK:"",examples:["Here's the thing — it doesn't work that way.","Here's the thing: I need more time."],image:"",srs:{},history:[],createdAt:1777893266629},
  {id:"pre_97",word:"I guess",meaning:"まあそうかな、一応",category:"口語表現",level:1,phonetic:"",audioUS:"",audioUK:"",examples:["I guess that makes sense.","I guess I was wrong."],image:"",srs:{},history:[],createdAt:1777893326629},
  {id:"pre_98",word:"that said",meaning:"とはいえ",category:"口語表現",level:2,phonetic:"",audioUS:"",audioUK:"",examples:["That said, there are some concerns.","That said, I think we're on track."],image:"",srs:{},history:[],createdAt:1777893386629},
  {id:"pre_99",word:"come to think of it",meaning:"よく考えると",category:"口語表現",level:2,phonetic:"",audioUS:"",audioUK:"",examples:["Come to think of it, I was there too.","Come to think of it, that's odd."],image:"",srs:{},history:[],createdAt:1777893446629},
  {id:"pre_100",word:"I could go for",meaning:"〜が食べたい・欲しい気分",category:"口語表現",level:2,phonetic:"",audioUS:"",audioUK:"",examples:["I could really go for a pizza.","I could go for a nap right now."],image:"",srs:{},history:[],createdAt:1777893506629},
  {id:"pre_101",word:"I'm all for it",meaning:"大賛成",category:"口語表現",level:2,phonetic:"",audioUS:"",audioUK:"",examples:["I'm all for trying new things.","I'm all for it — let's do this."],image:"",srs:{},history:[],createdAt:1777893566629},
  {id:"pre_102",word:"I'm over it",meaning:"もう気にしてない、終わった",category:"口語表現",level:2,phonetic:"",audioUS:"",audioUK:"",examples:["I was upset but I'm over it now.","I'm so over this drama."],image:"",srs:{},history:[],createdAt:1777893626629},
  {id:"pre_103",word:"you do you",meaning:"あなたはあなたらしくやれ",category:"口語表現",level:2,phonetic:"",audioUS:"",audioUK:"",examples:["I don't get it, but you do you.","You do you — I'll do me."],image:"",srs:{},history:[],createdAt:1777893686629},
  {id:"pre_104",word:"whatever works",meaning:"それでうまくいくなら",category:"口語表現",level:1,phonetic:"",audioUS:"",audioUK:"",examples:["Meet at 3? Whatever works.","Whatever works — I'm flexible."],image:"",srs:{},history:[],createdAt:1777893746629},
  {id:"pre_105",word:"at this point",meaning:"この段階では",category:"口語表現",level:2,phonetic:"",audioUS:"",audioUK:"",examples:["At this point, I've given up trying.","At this point, anything goes."],image:"",srs:{},history:[],createdAt:1777893806629},
  {id:"pre_106",word:"plot twist",meaning:"予想外の展開",category:"口語表現",level:2,phonetic:"",audioUS:"",audioUK:"",examples:["Plot twist — she's actually his sister.","And plot twist, he showed up."],image:"",srs:{},history:[],createdAt:1777893866629},
  {id:"pre_107",word:"between you and me",meaning:"内緒だけど",category:"口語表現",level:2,phonetic:"",audioUS:"",audioUK:"",examples:["Between you and me, I hated it.","Between you and me, she's leaving."],image:"",srs:{},history:[],createdAt:1777893926629},
  {id:"pre_108",word:"don't quote me on this",meaning:"確かじゃないけど",category:"口語表現",level:3,phonetic:"",audioUS:"",audioUK:"",examples:["Don't quote me, but I think it's tomorrow.","Don't quote me on this."],image:"",srs:{},history:[],createdAt:1777893986629},
  {id:"pre_109",word:"if you ask me",meaning:"私に言わせれば",category:"口語表現",level:2,phonetic:"",audioUS:"",audioUK:"",examples:["If you ask me, they should apologize.","If you ask me, the first option is better."],image:"",srs:{},history:[],createdAt:1777894046629},
  {id:"pre_110",word:"now that you mention it",meaning:"言われてみれば",category:"口語表現",level:2,phonetic:"",audioUS:"",audioUK:"",examples:["Now that you mention it, I did notice.","Now that you mention it, yeah."],image:"",srs:{},history:[],createdAt:1777894106629},
  {id:"pre_111",word:"speaking of which",meaning:"そういえば、それに関して",category:"口語表現",level:2,phonetic:"",audioUS:"",audioUK:"",examples:["Speaking of which, did you call him?","Speaking of which, I need to book."],image:"",srs:{},history:[],createdAt:1777894166629},
  {id:"pre_112",word:"that reminds me",meaning:"そういえば",category:"口語表現",level:1,phonetic:"",audioUS:"",audioUK:"",examples:["That reminds me — I forgot to tell you.","That reminds me, I need to call her."],image:"",srs:{},history:[],createdAt:1777894226629},
  {id:"pre_113",word:"while we're at it",meaning:"ついでに",category:"口語表現",level:2,phonetic:"",audioUS:"",audioUK:"",examples:["While we're at it, let's fix the other.","While we're at it, can you check this?"],image:"",srs:{},history:[],createdAt:1777894286629},
  {id:"pre_114",word:"quick question",meaning:"ちょっと聞いてもいい",category:"口語表現",level:1,phonetic:"",audioUS:"",audioUK:"",examples:["Quick question — do you know the password?","Quick question: is the meeting today?"],image:"",srs:{},history:[],createdAt:1777894346629},
  {id:"pre_115",word:"I can't even",meaning:"もう無理、言葉もない",category:"口語表現",level:2,phonetic:"",audioUS:"",audioUK:"",examples:["I can't even — that's too funny.","I can't even deal right now."],image:"",srs:{},history:[],createdAt:1777894406629},
  {id:"pre_116",word:"not gonna lie",meaning:"正直に言うと",category:"口語表現",level:2,phonetic:"",audioUS:"",audioUK:"",examples:["Not gonna lie, that scared me.","Not gonna lie, I cried at that movie."],image:"",srs:{},history:[],createdAt:1777894466629},
  {id:"pre_117",word:"funny you mention that",meaning:"それが偶然にも",category:"口語表現",level:2,phonetic:"",audioUS:"",audioUK:"",examples:["Funny you mention that — I was thinking the same.","Funny you mention that, I saw her today."],image:"",srs:{},history:[],createdAt:1777894526629},
  {id:"pre_118",word:"word",meaning:"わかった、そうだよ",category:"口語表現",level:2,phonetic:"",audioUS:"",audioUK:"",examples:["Word — I'll meet you there.","Word, that's exactly how I feel."],image:"",srs:{},history:[],createdAt:1777894586629},
  {id:"pre_119",word:"straight up",meaning:"正直に言うと",category:"口語表現",level:2,phonetic:"",audioUS:"",audioUK:"",examples:["Straight up, that was rude.","Straight up, I don't know what to do."],image:"",srs:{},history:[],createdAt:1777894646629},
  {id:"pre_120",word:"I'm dead",meaning:"笑い死にしそう",category:"口語表現",level:2,phonetic:"",audioUS:"",audioUK:"",examples:["That joke — I'm dead.","I'm dead, this is too funny."],image:"",srs:{},history:[],createdAt:1777894706629},
  {id:"pre_121",word:"big yikes",meaning:"うわあ、最悪",category:"口語表現",level:2,phonetic:"",audioUS:"",audioUK:"",examples:["Big yikes — that did not go well.","Forgot her birthday? Big yikes."],image:"",srs:{},history:[],createdAt:1777894766629},
  {id:"pre_122",word:"send it",meaning:"思い切ってやれ",category:"口語表現",level:2,phonetic:"",audioUS:"",audioUK:"",examples:["Just send it — stop overthinking.","You only live once, send it."],image:"",srs:{},history:[],createdAt:1777894826629},
  {id:"pre_123",word:"you had me at",meaning:"〜と言った時点で決まった",category:"口語表現",level:3,phonetic:"",audioUS:"",audioUK:"",examples:["You had me at free food.","You had me at open bar."],image:"",srs:{},history:[],createdAt:1777894886629},
  {id:"pre_124",word:"I feel like",meaning:"〜な気がする",category:"口語表現",level:1,phonetic:"",audioUS:"",audioUK:"",examples:["I feel like something's off.","I feel like she's avoiding me."],image:"",srs:{},history:[],createdAt:1777894946629},
  {id:"pre_125",word:"same difference",meaning:"同じようなもの",category:"口語表現",level:2,phonetic:"",audioUS:"",audioUK:"",examples:["Bus or subway? Same difference.","Same difference — doesn't matter."],image:"",srs:{},history:[],createdAt:1777895006629},
  {id:"pre_126",word:"while I have you",meaning:"ついでに",category:"口語表現",level:2,phonetic:"",audioUS:"",audioUK:"",examples:["While I have you, can I ask something?","While I have you — quick update."],image:"",srs:{},history:[],createdAt:1777895066629},
  {id:"pre_127",word:"I'm telling you",meaning:"本当だって",category:"口語表現",level:1,phonetic:"",audioUS:"",audioUK:"",examples:["I'm telling you, that place is amazing.","I'm telling you, it was him."],image:"",srs:{},history:[],createdAt:1777895126629},
  {id:"pre_128",word:"don't even get me started",meaning:"その話はしないで",category:"口語表現",level:2,phonetic:"",audioUS:"",audioUK:"",examples:["Don't even get me started on the traffic.","Don't even get me started on that."],image:"",srs:{},history:[],createdAt:1777895186629},
  {id:"pre_129",word:"you'd think",meaning:"普通そう思うよね",category:"口語表現",level:2,phonetic:"",audioUS:"",audioUK:"",examples:["You'd think they'd know better.","You'd think it'd be easier."],image:"",srs:{},history:[],createdAt:1777895246629},
  {id:"pre_130",word:"low-key obsessed",meaning:"めちゃくちゃはまってる",category:"口語表現",level:2,phonetic:"",audioUS:"",audioUK:"",examples:["I'm low-key obsessed with this show.","She's low-key obsessed with him."],image:"",srs:{},history:[],createdAt:1777895306629},
  {id:"pre_131",word:"hit the sack",meaning:"寝る",category:"熟語・イディオム",level:2,phonetic:"",audioUS:"",audioUK:"",examples:["I'm exhausted — time to hit the sack.","Let's hit the sack early tonight."],image:"",srs:{},history:[],createdAt:1777895366629},
  {id:"pre_132",word:"under the weather",meaning:"体の具合が悪い",category:"熟語・イディオム",level:2,phonetic:"",audioUS:"",audioUK:"",examples:["I'm feeling a bit under the weather.","She's under the weather today."],image:"",srs:{},history:[],createdAt:1777895426629},
  {id:"pre_133",word:"break a leg",meaning:"頑張って（舞台・発表前）",category:"熟語・イディオム",level:2,phonetic:"",audioUS:"",audioUK:"",examples:["Break a leg on your performance tonight!","Break a leg — you've got this."],image:"",srs:{},history:[],createdAt:1777895486629},
  {id:"pre_134",word:"bite the bullet",meaning:"歯を食いしばって耐える",category:"熟語・イディオム",level:3,phonetic:"",audioUS:"",audioUK:"",examples:["Just bite the bullet and get it done.","Sometimes you have to bite the bullet."],image:"",srs:{},history:[],createdAt:1777895546629},
  {id:"pre_135",word:"spill the tea",meaning:"ゴシップを話す",category:"熟語・イディオム",level:2,phonetic:"",audioUS:"",audioUK:"",examples:["Okay, spill the tea — what happened?","She spilled all the tea."],image:"",srs:{},history:[],createdAt:1777895606629},
  {id:"pre_136",word:"piece of cake",meaning:"朝飯前、簡単",category:"熟語・イディオム",level:1,phonetic:"",audioUS:"",audioUK:"",examples:["That test was a piece of cake.","For her, it's a piece of cake."],image:"",srs:{},history:[],createdAt:1777895666629},
  {id:"pre_137",word:"hit the nail on the head",meaning:"核心をついた",category:"熟語・イディオム",level:3,phonetic:"",audioUS:"",audioUK:"",examples:["You hit the nail on the head.","She hit the nail on the head."],image:"",srs:{},history:[],createdAt:1777895726629},
  {id:"pre_138",word:"burn bridges",meaning:"関係を壊す",category:"熟語・イディオム",level:3,phonetic:"",audioUS:"",audioUK:"",examples:["Don't burn bridges when you quit.","He burned every bridge he had."],image:"",srs:{},history:[],createdAt:1777895786629},
  {id:"pre_139",word:"cut to the chase",meaning:"本題に入る",category:"熟語・イディオム",level:2,phonetic:"",audioUS:"",audioUK:"",examples:["Let's cut to the chase.","He always cuts to the chase."],image:"",srs:{},history:[],createdAt:1777895846629},
  {id:"pre_140",word:"on the same page",meaning:"同じ認識でいる",category:"熟語・イディオム",level:2,phonetic:"",audioUS:"",audioUK:"",examples:["Are we on the same page?","Let's make sure we're on the same page."],image:"",srs:{},history:[],createdAt:1777895906629},
  {id:"pre_141",word:"once in a blue moon",meaning:"めったにない",category:"熟語・イディオム",level:3,phonetic:"",audioUS:"",audioUK:"",examples:["He calls once in a blue moon.","That happens once in a blue moon."],image:"",srs:{},history:[],createdAt:1777895966629},
  {id:"pre_142",word:"cost an arm and a leg",meaning:"非常に高い",category:"熟語・イディオム",level:2,phonetic:"",audioUS:"",audioUK:"",examples:["Rent here costs an arm and a leg.","That bag cost an arm and a leg."],image:"",srs:{},history:[],createdAt:1777896026629},
  {id:"pre_143",word:"throw under the bus",meaning:"責任を押し付ける",category:"熟語・イディオム",level:3,phonetic:"",audioUS:"",audioUK:"",examples:["He threw his teammate under the bus.","Don't throw me under the bus."],image:"",srs:{},history:[],createdAt:1777896086629},
  {id:"pre_144",word:"bite off more than you can chew",meaning:"手に負えないことを引き受ける",category:"熟語・イディオム",level:3,phonetic:"",audioUS:"",audioUK:"",examples:["I bit off more than I could chew.","Don't bite off more than you can chew."],image:"",srs:{},history:[],createdAt:1777896146629},
  {id:"pre_145",word:"the ball is in your court",meaning:"あなた次第",category:"熟語・イディオム",level:3,phonetic:"",audioUS:"",audioUK:"",examples:["The ball is in your court now.","I made the offer — the ball is in your court."],image:"",srs:{},history:[],createdAt:1777896206629},
  {id:"pre_146",word:"sit on the fence",meaning:"どっちつかずでいる",category:"熟語・イディオム",level:3,phonetic:"",audioUS:"",audioUK:"",examples:["Stop sitting on the fence — decide.","He's been sitting on the fence."],image:"",srs:{},history:[],createdAt:1777896266629},
  {id:"pre_147",word:"kick the bucket",meaning:"死ぬ（俗語）",category:"熟語・イディオム",level:3,phonetic:"",audioUS:"",audioUK:"",examples:["He kicked the bucket last year.","I'll do it before I kick the bucket."],image:"",srs:{},history:[],createdAt:1777896326629},
  {id:"pre_148",word:"let the cat out of the bag",meaning:"秘密を漏らす",category:"熟語・イディオム",level:2,phonetic:"",audioUS:"",audioUK:"",examples:["Oops, I let the cat out of the bag.","Who let the cat out of the bag?"],image:"",srs:{},history:[],createdAt:1777896386629},
  {id:"pre_149",word:"hit the ground running",meaning:"すぐに全力で始める",category:"熟語・イディオム",level:3,phonetic:"",audioUS:"",audioUK:"",examples:["She hit the ground running on day one.","We need to hit the ground running."],image:"",srs:{},history:[],createdAt:1777896446629},
  {id:"pre_150",word:"elephant in the room",meaning:"誰もが気づいてるのに話さない問題",category:"熟語・イディオム",level:3,phonetic:"",audioUS:"",audioUK:"",examples:["Let's address the elephant in the room.","There's an elephant in the room."],image:"",srs:{},history:[],createdAt:1777896506629},
  {id:"pre_151",word:"under the radar",meaning:"目立たない",category:"熟語・イディオム",level:2,phonetic:"",audioUS:"",audioUK:"",examples:["He flew under the radar for years.","Keep it under the radar for now."],image:"",srs:{},history:[],createdAt:1777896566629},
  {id:"pre_152",word:"back to square one",meaning:"振り出しに戻る",category:"熟語・イディオム",level:2,phonetic:"",audioUS:"",audioUK:"",examples:["The deal fell through — back to square one.","We're back to square one."],image:"",srs:{},history:[],createdAt:1777896626629},
  {id:"pre_153",word:"beat around the bush",meaning:"遠回しに言う",category:"熟語・イディオム",level:2,phonetic:"",audioUS:"",audioUK:"",examples:["Stop beating around the bush.","He beat around the bush for 10 minutes."],image:"",srs:{},history:[],createdAt:1777896686629},
  {id:"pre_154",word:"miss the boat",meaning:"機会を逃す",category:"熟語・イディオム",level:2,phonetic:"",audioUS:"",audioUK:"",examples:["You missed the boat on that deal.","Don't miss the boat on this."],image:"",srs:{},history:[],createdAt:1777896746629},
  {id:"pre_155",word:"hit rock bottom",meaning:"どん底に落ちる",category:"熟語・イディオム",level:2,phonetic:"",audioUS:"",audioUK:"",examples:["He hit rock bottom last year.","Things got better after she hit rock bottom."],image:"",srs:{},history:[],createdAt:1777896806629},
  {id:"pre_156",word:"give the cold shoulder",meaning:"無視する、冷たくする",category:"熟語・イディオム",level:2,phonetic:"",audioUS:"",audioUK:"",examples:["She gave him the cold shoulder.","Why are you giving me the cold shoulder?"],image:"",srs:{},history:[],createdAt:1777896866629},
  {id:"pre_157",word:"a blessing in disguise",meaning:"一見不幸だが実は幸運",category:"熟語・イディオム",level:3,phonetic:"",audioUS:"",audioUK:"",examples:["Getting fired was a blessing in disguise.","That mistake was a blessing in disguise."],image:"",srs:{},history:[],createdAt:1777896926629},
  {id:"pre_158",word:"kill two birds with one stone",meaning:"一石二鳥",category:"熟語・イディオム",level:2,phonetic:"",audioUS:"",audioUK:"",examples:["We can kill two birds with one stone.","Let's kill two birds with one stone."],image:"",srs:{},history:[],createdAt:1777896986629},
  {id:"pre_159",word:"the last straw",meaning:"堪忍袋の緒が切れる",category:"熟語・イディオム",level:2,phonetic:"",audioUS:"",audioUK:"",examples:["That was the last straw for me.","His rudeness was the last straw."],image:"",srs:{},history:[],createdAt:1777897046629},
  {id:"pre_160",word:"add fuel to the fire",meaning:"火に油を注ぐ",category:"熟語・イディオム",level:2,phonetic:"",audioUS:"",audioUK:"",examples:["His comment added fuel to the fire.","Don't add fuel to the fire."],image:"",srs:{},history:[],createdAt:1777897106629},
  {id:"pre_161",word:"break the ice",meaning:"緊張をほぐす",category:"熟語・イディオム",level:2,phonetic:"",audioUS:"",audioUK:"",examples:["He told a joke to break the ice.","Let's play a game to break the ice."],image:"",srs:{},history:[],createdAt:1777897166629},
  {id:"pre_162",word:"keep your chin up",meaning:"元気を出して",category:"熟語・イディオム",level:1,phonetic:"",audioUS:"",audioUK:"",examples:["Keep your chin up — things will improve.","Keep your chin up, it'll be okay."],image:"",srs:{},history:[],createdAt:1777897226629},
  {id:"pre_163",word:"get the ball rolling",meaning:"物事を動かし始める",category:"熟語・イディオム",level:2,phonetic:"",audioUS:"",audioUK:"",examples:["Let's get the ball rolling.","She got the ball rolling on the project."],image:"",srs:{},history:[],createdAt:1777897286629},
  {id:"pre_164",word:"hang in there",meaning:"頑張って、耐えて",category:"熟語・イディオム",level:1,phonetic:"",audioUS:"",audioUK:"",examples:["Hang in there — almost done.","Hang in there, it gets easier."],image:"",srs:{},history:[],createdAt:1777897346629},
  {id:"pre_165",word:"take with a grain of salt",meaning:"割り引いて考える",category:"熟語・イディオム",level:3,phonetic:"",audioUS:"",audioUK:"",examples:["Take what he says with a grain of salt.","I'd take that news with a grain of salt."],image:"",srs:{},history:[],createdAt:1777897406629},
  {id:"pre_166",word:"see eye to eye",meaning:"意見が一致する",category:"熟語・イディオム",level:2,phonetic:"",audioUS:"",audioUK:"",examples:["We don't always see eye to eye.","They finally see eye to eye."],image:"",srs:{},history:[],createdAt:1777897466629},
  {id:"pre_167",word:"pull someone's leg",meaning:"からかう",category:"熟語・イディオム",level:2,phonetic:"",audioUS:"",audioUK:"",examples:["Are you pulling my leg?","He was just pulling your leg."],image:"",srs:{},history:[],createdAt:1777897526629},
  {id:"pre_168",word:"get cold feet",meaning:"土壇場で怖気づく",category:"熟語・イディオム",level:2,phonetic:"",audioUS:"",audioUK:"",examples:["She got cold feet before the wedding.","Don't get cold feet now."],image:"",srs:{},history:[],createdAt:1777897586629},
  {id:"pre_169",word:"call it a day",meaning:"今日はここまでにする",category:"熟語・イディオム",level:1,phonetic:"",audioUS:"",audioUK:"",examples:["Let's call it a day.","I'm tired — let's call it a day."],image:"",srs:{},history:[],createdAt:1777897646629},
  {id:"pre_170",word:"wrap your head around",meaning:"理解する、受け入れる",category:"熟語・イディオム",level:2,phonetic:"",audioUS:"",audioUK:"",examples:["I can't wrap my head around this.","Give me time to wrap my head around it."],image:"",srs:{},history:[],createdAt:1777897706629},
  {id:"pre_171",word:"get the hang of it",meaning:"コツをつかむ",category:"熟語・イディオム",level:1,phonetic:"",audioUS:"",audioUK:"",examples:["You'll get the hang of it soon.","It took me a week to get the hang of it."],image:"",srs:{},history:[],createdAt:1777897766629},
  {id:"pre_172",word:"go the extra mile",meaning:"特別な努力をする",category:"熟語・イディオム",level:2,phonetic:"",audioUS:"",audioUK:"",examples:["She always goes the extra mile.","He went the extra mile for his clients."],image:"",srs:{},history:[],createdAt:1777897826629},
  {id:"pre_173",word:"down to earth",meaning:"気さく、現実的",category:"熟語・イディオム",level:2,phonetic:"",audioUS:"",audioUK:"",examples:["She's so down to earth for a celebrity.","I love how down to earth he is."],image:"",srs:{},history:[],createdAt:1777897886629},
  {id:"pre_174",word:"read between the lines",meaning:"行間を読む",category:"熟語・イディオム",level:2,phonetic:"",audioUS:"",audioUK:"",examples:["You need to read between the lines.","I read between the lines and understood."],image:"",srs:{},history:[],createdAt:1777897946629},
  {id:"pre_175",word:"on thin ice",meaning:"危うい状況にある",category:"熟語・イディオム",level:2,phonetic:"",audioUS:"",audioUK:"",examples:["He's on thin ice with his boss.","Be careful — you're on thin ice."],image:"",srs:{},history:[],createdAt:1777898006629},
  {id:"pre_176",word:"throw in the towel",meaning:"諦める",category:"熟語・イディオム",level:2,phonetic:"",audioUS:"",audioUK:"",examples:["Don't throw in the towel yet.","She threw in the towel after round 5."],image:"",srs:{},history:[],createdAt:1777898066629},
  {id:"pre_177",word:"tip of the iceberg",meaning:"氷山の一角",category:"熟語・イディオム",level:2,phonetic:"",audioUS:"",audioUK:"",examples:["That's just the tip of the iceberg.","What you see is the tip of the iceberg."],image:"",srs:{},history:[],createdAt:1777898126629},
  {id:"pre_178",word:"bite your tongue",meaning:"言いたいことを我慢する",category:"熟語・イディオム",level:2,phonetic:"",audioUS:"",audioUK:"",examples:["I had to bite my tongue.","Sometimes you have to bite your tongue."],image:"",srs:{},history:[],createdAt:1777898186629},
  {id:"pre_179",word:"burn the midnight oil",meaning:"夜遅くまで働く・勉強する",category:"熟語・イディオム",level:2,phonetic:"",audioUS:"",audioUK:"",examples:["We burned the midnight oil to finish.","She's been burning the midnight oil."],image:"",srs:{},history:[],createdAt:1777898246629},
  {id:"pre_180",word:"catch someone off guard",meaning:"不意をつく",category:"熟語・イディオム",level:2,phonetic:"",audioUS:"",audioUK:"",examples:["That question caught me off guard.","He caught her completely off guard."],image:"",srs:{},history:[],createdAt:1777898306629},
  {id:"pre_181",word:"cut corners",meaning:"手を抜く",category:"熟語・イディオム",level:2,phonetic:"",audioUS:"",audioUK:"",examples:["Don't cut corners on this project.","They cut corners and it shows."],image:"",srs:{},history:[],createdAt:1777898366629},
  {id:"pre_182",word:"drop the ball",meaning:"失敗する、ミスをする",category:"熟語・イディオム",level:2,phonetic:"",audioUS:"",audioUK:"",examples:["He really dropped the ball on that.","We can't afford to drop the ball."],image:"",srs:{},history:[],createdAt:1777898426629},
  {id:"pre_183",word:"face the music",meaning:"現実に向き合う",category:"熟語・イディオム",level:2,phonetic:"",audioUS:"",audioUK:"",examples:["It's time to face the music.","He has to face the music eventually."],image:"",srs:{},history:[],createdAt:1777898486629},
  {id:"pre_184",word:"jump to conclusions",meaning:"早合点する",category:"熟語・イディオム",level:2,phonetic:"",audioUS:"",audioUK:"",examples:["Don't jump to conclusions.","She jumped to conclusions too fast."],image:"",srs:{},history:[],createdAt:1777898546629},
  {id:"pre_185",word:"keep a low profile",meaning:"目立たないようにする",category:"熟語・イディオム",level:2,phonetic:"",audioUS:"",audioUK:"",examples:["Keep a low profile for now.","He kept a low profile after the scandal."],image:"",srs:{},history:[],createdAt:1777898606629},
  {id:"pre_186",word:"out of the blue",meaning:"突然、予告なしに",category:"熟語・イディオム",level:2,phonetic:"",audioUS:"",audioUK:"",examples:["She called me out of the blue.","He quit out of the blue."],image:"",srs:{},history:[],createdAt:1777898666629},
  {id:"pre_187",word:"play it by ear",meaning:"計画なしに状況に合わせて臨機応変に対応する",category:"熟語・イディオム",level:2,phonetic:"",audioUS:"",audioUK:"",examples:["Let's play it by ear.","I'll just play it by ear tonight."],image:"",srs:{},history:[],createdAt:1777898726629},
  {id:"pre_188",word:"ring a bell",meaning:"思い当たる、ピンとくる",category:"熟語・イディオム",level:2,phonetic:"",audioUS:"",audioUK:"",examples:["Does that name ring a bell?","That story rings a bell."],image:"",srs:{},history:[],createdAt:1777898786629},
  {id:"pre_189",word:"sleep on it",meaning:"一晩考える",category:"熟語・イディオム",level:2,phonetic:"",audioUS:"",audioUK:"",examples:["Sleep on it before you decide.","Let me sleep on it."],image:"",srs:{},history:[],createdAt:1777898846629},
  {id:"pre_190",word:"think outside the box",meaning:"型にはまらず考える",category:"熟語・イディオム",level:2,phonetic:"",audioUS:"",audioUK:"",examples:["We need to think outside the box.","She always thinks outside the box."],image:"",srs:{},history:[],createdAt:1777898906629},
  {id:"pre_191",word:"by the skin of your teeth",meaning:"かろうじて",category:"熟語・イディオム",level:3,phonetic:"",audioUS:"",audioUK:"",examples:["We made it by the skin of our teeth.","He passed by the skin of his teeth."],image:"",srs:{},history:[],createdAt:1777898966629},
  {id:"pre_192",word:"blow off steam",meaning:"ストレス発散する",category:"熟語・イディオム",level:2,phonetic:"",audioUS:"",audioUK:"",examples:["I go for a run to blow off steam.","She needed to blow off some steam."],image:"",srs:{},history:[],createdAt:1777899026629},
  {id:"pre_193",word:"get carried away",meaning:"夢中になりすぎる",category:"熟語・イディオム",level:2,phonetic:"",audioUS:"",audioUK:"",examples:["Don't get carried away with ideas.","He got carried away and spent too much."],image:"",srs:{},history:[],createdAt:1777899086629},
  {id:"pre_194",word:"come clean",meaning:"白状する、正直に話す",category:"熟語・イディオム",level:2,phonetic:"",audioUS:"",audioUK:"",examples:["He finally came clean about the mistake.","It's better to come clean now."],image:"",srs:{},history:[],createdAt:1777899146629},
  {id:"pre_195",word:"easier said than done",meaning:"言うは易し行うは難し",category:"熟語・イディオム",level:1,phonetic:"",audioUS:"",audioUK:"",examples:["That's easier said than done.","Easier said than done, trust me."],image:"",srs:{},history:[],createdAt:1777899206629},
  {id:"pre_196",word:"every cloud has a silver lining",meaning:"どんなことにもいい面がある",category:"熟語・イディオム",level:2,phonetic:"",audioUS:"",audioUK:"",examples:["Every cloud has a silver lining.","It was hard, but there's a silver lining."],image:"",srs:{},history:[],createdAt:1777899266629},
  {id:"pre_197",word:"get on someone's nerves",meaning:"神経を逆なでする",category:"熟語・イディオム",level:2,phonetic:"",audioUS:"",audioUK:"",examples:["He really gets on my nerves.","That noise is getting on my nerves."],image:"",srs:{},history:[],createdAt:1777899326629},
  {id:"pre_198",word:"add insult to injury",meaning:"さらに傷つける、泣き面に蜂",category:"熟語・イディオム",level:3,phonetic:"",audioUS:"",audioUK:"",examples:["To add insult to injury, it started raining.","And to add insult to injury, he laughed."],image:"",srs:{},history:[],createdAt:1777899386629},
  {id:"pre_199",word:"bend over backwards",meaning:"精一杯努力する",category:"熟語・イディオム",level:2,phonetic:"",audioUS:"",audioUK:"",examples:["She bent over backwards to help.","We bent over backwards for that client."],image:"",srs:{},history:[],createdAt:1777899446629},
  {id:"pre_200",word:"speak of the devil",meaning:"噂をすれば（影が差す）",category:"熟語・イディオム",level:2,phonetic:"",audioUS:"",audioUK:"",examples:["Speak of the devil — here she comes!","Speak of the devil, he just texted me."],image:"",srs:{},history:[],createdAt:1777899506629},
  {id:"pre_201",word:"no pain no gain",meaning:"苦労なくして利益なし",category:"熟語・イディオム",level:1,phonetic:"",audioUS:"",audioUK:"",examples:["No pain no gain — keep training.","No pain no gain is real in this job."],image:"",srs:{},history:[],createdAt:1777899566629},
  {id:"pre_202",word:"let it go",meaning:"手放す、気にしない",category:"熟語・イディオム",level:1,phonetic:"",audioUS:"",audioUK:"",examples:["Just let it go — it's not worth it.","Learn to let it go."],image:"",srs:{},history:[],createdAt:1777899626629},
  {id:"pre_203",word:"give it a shot",meaning:"試してみる",category:"熟語・イディオム",level:1,phonetic:"",audioUS:"",audioUK:"",examples:["Give it a shot — you might like it.","Why not give it a shot?"],image:"",srs:{},history:[],createdAt:1777899686629},
  {id:"pre_204",word:"it's a long shot",meaning:"可能性は低い",category:"熟語・イディオム",level:2,phonetic:"",audioUS:"",audioUK:"",examples:["It's a long shot but worth trying.","That's a long shot, but go for it."],image:"",srs:{},history:[],createdAt:1777899746629},
  {id:"pre_205",word:"go back to the drawing board",meaning:"最初からやり直す",category:"熟語・イディオム",level:2,phonetic:"",audioUS:"",audioUK:"",examples:["We need to go back to the drawing board.","Back to the drawing board after that."],image:"",srs:{},history:[],createdAt:1777899806629},
  {id:"pre_206",word:"I'm good",meaning:"大丈夫です、結構です",category:"日常会話",level:1,phonetic:"",audioUS:"",audioUK:"",examples:["Want more coffee? I'm good, thanks.","I'm good — don't worry about me."],image:"",srs:{},history:[],createdAt:1777899866629},
  {id:"pre_207",word:"fair enough",meaning:"まあ確かに、なるほど",category:"日常会話",level:1,phonetic:"",audioUS:"",audioUK:"",examples:["Fair enough — I understand your point.","Fair enough, I can see that."],image:"",srs:{},history:[],createdAt:1777899926629},
  {id:"pre_208",word:"I hear you",meaning:"わかる、共感する",category:"日常会話",level:2,phonetic:"",audioUS:"",audioUK:"",examples:["I hear you — it's been a tough week.","I hear you and understand."],image:"",srs:{},history:[],createdAt:1777899986629},
  {id:"pre_209",word:"make yourself at home",meaning:"くつろいでください",category:"日常会話",level:2,phonetic:"",audioUS:"",audioUK:"",examples:["Come in! Make yourself at home.","The fridge is open — make yourself at home."],image:"",srs:{},history:[],createdAt:1777900046629},
  {id:"pre_210",word:"take it easy",meaning:"無理しないで",category:"日常会話",level:1,phonetic:"",audioUS:"",audioUK:"",examples:["Take it easy — you just had surgery.","See you later! Take it easy!"],image:"",srs:{},history:[],createdAt:1777900106629},
  {id:"pre_211",word:"it's on me",meaning:"私のおごり",category:"日常会話",level:2,phonetic:"",audioUS:"",audioUK:"",examples:["Don't worry about the bill — it's on me.","Drinks are on me tonight."],image:"",srs:{},history:[],createdAt:1777900166629},
  {id:"pre_212",word:"same here",meaning:"私もそうです",category:"日常会話",level:1,phonetic:"",audioUS:"",audioUK:"",examples:["I'm starving. Same here!","Same here — I've been so busy."],image:"",srs:{},history:[],createdAt:1777900226629},
  {id:"pre_213",word:"rain check",meaning:"またの機会に",category:"日常会話",level:2,phonetic:"",audioUS:"",audioUK:"",examples:["Can I take a rain check on tonight?","Mind if I take a rain check?"],image:"",srs:{},history:[],createdAt:1777900286629},
  {id:"pre_214",word:"long time no see",meaning:"久しぶり",category:"日常会話",level:1,phonetic:"",audioUS:"",audioUK:"",examples:["Long time no see! How have you been?","Hey! Long time no see."],image:"",srs:{},history:[],createdAt:1777900346629},
  {id:"pre_215",word:"go for it",meaning:"やってみなよ",category:"日常会話",level:1,phonetic:"",audioUS:"",audioUK:"",examples:["You should go for it — apply!","Go for it — you've got nothing to lose."],image:"",srs:{},history:[],createdAt:1777900406629},
  {id:"pre_216",word:"what's the deal",meaning:"どういうこと",category:"日常会話",level:2,phonetic:"",audioUS:"",audioUK:"",examples:["What's the deal with all the noise?","What's the deal — are we meeting or not?"],image:"",srs:{},history:[],createdAt:1777900466629},
  {id:"pre_217",word:"come on",meaning:"まさか、早くして",category:"日常会話",level:1,phonetic:"",audioUS:"",audioUK:"",examples:["Come on — you can't be serious.","Come on, we're going to be late!"],image:"",srs:{},history:[],createdAt:1777900526629},
  {id:"pre_218",word:"you're telling me",meaning:"本当にそうだよね（強い同意）",category:"日常会話",level:2,phonetic:"",audioUS:"",audioUK:"",examples:["This traffic is awful. You're telling me!","You're telling me — I've been saying that."],image:"",srs:{},history:[],createdAt:1777900586629},
  {id:"pre_219",word:"how does that sound",meaning:"どう思う、それでいい",category:"日常会話",level:1,phonetic:"",audioUS:"",audioUK:"",examples:["Dinner at 7? How does that sound?","Let's meet Monday — how does that sound?"],image:"",srs:{},history:[],createdAt:1777900646629},
  {id:"pre_220",word:"sounds like a plan",meaning:"それでいこう",category:"日常会話",level:1,phonetic:"",audioUS:"",audioUK:"",examples:["Lunch at noon? Sounds like a plan!","Sounds like a plan — see you then."],image:"",srs:{},history:[],createdAt:1777900706629},
  {id:"pre_221",word:"works for me",meaning:"それで大丈夫",category:"日常会話",level:1,phonetic:"",audioUS:"",audioUK:"",examples:["Tuesday? Works for me.","Any time after 3 works for me."],image:"",srs:{},history:[],createdAt:1777900766629},
  {id:"pre_222",word:"I'm in",meaning:"参加します、やります",category:"日常会話",level:1,phonetic:"",audioUS:"",audioUK:"",examples:["Road trip this weekend? I'm in!","Count me in — I'm in."],image:"",srs:{},history:[],createdAt:1777900826629},
  {id:"pre_223",word:"my treat",meaning:"私がおごります",category:"日常会話",level:2,phonetic:"",audioUS:"",audioUK:"",examples:["Put your wallet away — my treat.","Let me get this — my treat."],image:"",srs:{},history:[],createdAt:1777900886629},
  {id:"pre_224",word:"better late than never",meaning:"遅くなってもやらないよりまし",category:"日常会話",level:2,phonetic:"",audioUS:"",audioUK:"",examples:["Thanks for coming — better late than never.","Better late than never, right?"],image:"",srs:{},history:[],createdAt:1777900946629},
  {id:"pre_225",word:"it happens",meaning:"そういうこともある",category:"日常会話",level:1,phonetic:"",audioUS:"",audioUK:"",examples:["Don't worry, it happens to everyone.","Spilled coffee? It happens."],image:"",srs:{},history:[],createdAt:1777901006629},
  {id:"pre_226",word:"what are the odds",meaning:"なんという偶然",category:"日常会話",level:2,phonetic:"",audioUS:"",audioUK:"",examples:["We took the same flight — what are the odds?","What are the odds of that?"],image:"",srs:{},history:[],createdAt:1777901066629},
  {id:"pre_227",word:"small world",meaning:"世間は狭い",category:"日常会話",level:1,phonetic:"",audioUS:"",audioUK:"",examples:["You know her too? Small world!","Small world — we went to the same school."],image:"",srs:{},history:[],createdAt:1777901126629},
  {id:"pre_228",word:"go figure",meaning:"不思議だね、なんでそうなるの（驚き・呆れ・皮肉）",category:"日常会話",level:2,phonetic:"",audioUS:"",audioUK:"",examples:["It's a terrible movie and it made $200 million. Go figure!","He said he was too busy, then spent hours gaming. Go figure."],image:"",srs:{},history:[],createdAt:1777901186629},
  {id:"pre_229",word:"by all means",meaning:"もちろん、どうぞ",category:"日常会話",level:2,phonetic:"",audioUS:"",audioUK:"",examples:["Can I sit here? By all means.","By all means, help yourself."],image:"",srs:{},history:[],createdAt:1777901246629},
  {id:"pre_230",word:"be my guest",meaning:"どうぞ、遠慮なく",category:"日常会話",level:2,phonetic:"",audioUS:"",audioUK:"",examples:["Can I use your phone? Be my guest.","Be my guest — take as much as you want."],image:"",srs:{},history:[],createdAt:1777901306629},
  {id:"pre_231",word:"suit yourself",meaning:"ご自由に",category:"日常会話",level:2,phonetic:"",audioUS:"",audioUK:"",examples:["I'm not going. Suit yourself.","If you don't want help, suit yourself."],image:"",srs:{},history:[],createdAt:1777901366629},
  {id:"pre_232",word:"knock yourself out",meaning:"思う存分どうぞ",category:"日常会話",level:2,phonetic:"",audioUS:"",audioUK:"",examples:["Can I eat the leftovers? Knock yourself out.","The gym's open — knock yourself out."],image:"",srs:{},history:[],createdAt:1777901426629},
  {id:"pre_233",word:"your call",meaning:"あなたが決めて",category:"日常会話",level:1,phonetic:"",audioUS:"",audioUK:"",examples:["Pizza or sushi? Your call.","It's your call — I'm fine either way."],image:"",srs:{},history:[],createdAt:1777901486629},
  {id:"pre_234",word:"just say the word",meaning:"いつでも言ってね",category:"日常会話",level:2,phonetic:"",audioUS:"",audioUK:"",examples:["Need help? Just say the word.","Just say the word and I'll be there."],image:"",srs:{},history:[],createdAt:1777901546629},
  {id:"pre_235",word:"keep me posted",meaning:"経過を教えて",category:"日常会話",level:2,phonetic:"",audioUS:"",audioUK:"",examples:["Keep me posted on how it goes.","Keep me posted — I want to know."],image:"",srs:{},history:[],createdAt:1777901606629},
  {id:"pre_236",word:"stay in touch",meaning:"連絡し続けてね",category:"日常会話",level:1,phonetic:"",audioUS:"",audioUK:"",examples:["Stay in touch — don't be a stranger.","It was great seeing you — stay in touch."],image:"",srs:{},history:[],createdAt:1777901666629},
  {id:"pre_237",word:"take care",meaning:"お気をつけて",category:"日常会話",level:1,phonetic:"",audioUS:"",audioUK:"",examples:["Take care! See you next time.","Take care of yourself."],image:"",srs:{},history:[],createdAt:1777901726629},
  {id:"pre_238",word:"have a good one",meaning:"いい一日を",category:"日常会話",level:1,phonetic:"",audioUS:"",audioUK:"",examples:["Thanks for coming — have a good one.","Have a good one! See you later."],image:"",srs:{},history:[],createdAt:1777901786629},
  {id:"pre_239",word:"see you around",meaning:"またね",category:"日常会話",level:1,phonetic:"",audioUS:"",audioUK:"",examples:["Nice running into you — see you around.","See you around sometime."],image:"",srs:{},history:[],createdAt:1777901846629},
  {id:"pre_240",word:"don't sweat it",meaning:"気にするな",category:"日常会話",level:1,phonetic:"",audioUS:"",audioUK:"",examples:["Don't sweat it — it's not a big deal.","Forget about it — don't sweat it."],image:"",srs:{},history:[],createdAt:1777901906629},
  {id:"pre_241",word:"water under the bridge",meaning:"もう過ぎたこと",category:"日常会話",level:2,phonetic:"",audioUS:"",audioUK:"",examples:["We fought but it's water under the bridge.","That's all water under the bridge."],image:"",srs:{},history:[],createdAt:1777901966629},
  {id:"pre_242",word:"no harm done",meaning:"被害なし、問題なし",category:"日常会話",level:1,phonetic:"",audioUS:"",audioUK:"",examples:["You bumped me? No harm done.","No harm done — no one got hurt."],image:"",srs:{},history:[],createdAt:1777902026629},
  {id:"pre_243",word:"fresh start",meaning:"新たな始まり",category:"日常会話",level:1,phonetic:"",audioUS:"",audioUK:"",examples:["Let's have a fresh start.","January feels like a fresh start."],image:"",srs:{},history:[],createdAt:1777902086629},
  {id:"pre_244",word:"live and learn",meaning:"経験から学ぶ",category:"日常会話",level:2,phonetic:"",audioUS:"",audioUK:"",examples:["Lost money on that — live and learn.","Live and learn, I guess."],image:"",srs:{},history:[],createdAt:1777902146629},
  {id:"pre_245",word:"that's life",meaning:"それが人生",category:"日常会話",level:1,phonetic:"",audioUS:"",audioUK:"",examples:["Things don't always go your way — that's life.","That's life — keep moving forward."],image:"",srs:{},history:[],createdAt:1777902206629},
  {id:"pre_246",word:"you've got this",meaning:"あなたならできる",category:"日常会話",level:1,phonetic:"",audioUS:"",audioUK:"",examples:["Nervous about the interview? You've got this.","You've trained hard — you've got this."],image:"",srs:{},history:[],createdAt:1777902266629},
  {id:"pre_247",word:"proud of you",meaning:"あなたのことが誇らしい",category:"日常会話",level:1,phonetic:"",audioUS:"",audioUK:"",examples:["You did great — I'm proud of you.","Seriously, I'm so proud of you."],image:"",srs:{},history:[],createdAt:1777902326629},
  {id:"pre_248",word:"good for you",meaning:"よかったね、すごいね",category:"日常会話",level:1,phonetic:"",audioUS:"",audioUK:"",examples:["You got promoted? Good for you!","Good for you — you deserve it."],image:"",srs:{},history:[],createdAt:1777902386629},
  {id:"pre_249",word:"could be worse",meaning:"まあ最悪じゃない",category:"日常会話",level:1,phonetic:"",audioUS:"",audioUK:"",examples:["It's not great, but it could be worse.","Could be worse — could be raining."],image:"",srs:{},history:[],createdAt:1777902446629},
  {id:"pre_250",word:"moving on",meaning:"次に進もう",category:"日常会話",level:1,phonetic:"",audioUS:"",audioUK:"",examples:["Enough about that — moving on.","Moving on, what's next?"],image:"",srs:{},history:[],createdAt:1777902506629},
  {id:"pre_251",word:"all good",meaning:"全部大丈夫",category:"日常会話",level:1,phonetic:"",audioUS:"",audioUK:"",examples:["Everything all good? All good here.","All good — no worries."],image:"",srs:{},history:[],createdAt:1777902566629},
  {id:"pre_252",word:"what can you do",meaning:"どうしようもない",category:"日常会話",level:1,phonetic:"",audioUS:"",audioUK:"",examples:["It rained on the picnic — what can you do?","What can you do? Things happen."],image:"",srs:{},history:[],createdAt:1777902626629},
  {id:"pre_253",word:"same old same old",meaning:"いつも通り",category:"日常会話",level:1,phonetic:"",audioUS:"",audioUK:"",examples:["How are things? Same old same old.","Same old same old — nothing new."],image:"",srs:{},history:[],createdAt:1777902686629},
  {id:"pre_254",word:"can't complain",meaning:"まあ悪くないよ",category:"日常会話",level:1,phonetic:"",audioUS:"",audioUK:"",examples:["How are you? Can't complain.","Business is good — can't complain."],image:"",srs:{},history:[],createdAt:1777902746629},
  {id:"pre_255",word:"not much",meaning:"特に何もない",category:"日常会話",level:1,phonetic:"",audioUS:"",audioUK:"",examples:["What's new? Not much.","Not much going on today."],image:"",srs:{},history:[],createdAt:1777902806629},
  {id:"pre_256",word:"better than nothing",meaning:"ないよりはまし",category:"日常会話",level:1,phonetic:"",audioUS:"",audioUK:"",examples:["It's not perfect, but better than nothing.","Better than nothing — I'll take it."],image:"",srs:{},history:[],createdAt:1777902866629},
  {id:"pre_257",word:"you never know",meaning:"どうなるかわからない",category:"日常会話",level:1,phonetic:"",audioUS:"",audioUK:"",examples:["Try it — you never know.","You never know until you try."],image:"",srs:{},history:[],createdAt:1777902926629},
  {id:"pre_258",word:"lesson learned",meaning:"いい教訓になった",category:"日常会話",level:1,phonetic:"",audioUS:"",audioUK:"",examples:["Lesson learned — I'll back up my files.","Expensive lesson, but lesson learned."],image:"",srs:{},history:[],createdAt:1777902986629},
  {id:"pre_259",word:"what's done is done",meaning:"もう終わったことだ",category:"日常会話",level:1,phonetic:"",audioUS:"",audioUK:"",examples:["Stop worrying — what's done is done.","What's done is done; focus on fixing it."],image:"",srs:{},history:[],createdAt:1777903046629},
  {id:"pre_260",word:"let bygones be bygones",meaning:"水に流す",category:"日常会話",level:2,phonetic:"",audioUS:"",audioUK:"",examples:["Let's let bygones be bygones.","Time to let bygones be bygones."],image:"",srs:{},history:[],createdAt:1777903106629},
  {id:"pre_261",word:"touch base",meaning:"連絡を取る、確認する",category:"ビジネス",level:2,phonetic:"",audioUS:"",audioUK:"",examples:["Let's touch base tomorrow.","I'll touch base with the client today."],image:"",srs:{},history:[],createdAt:1777903166629},
  {id:"pre_262",word:"circle back",meaning:"後で話し合う",category:"ビジネス",level:2,phonetic:"",audioUS:"",audioUK:"",examples:["Let's circle back to that later.","I'll circle back with an update by Friday."],image:"",srs:{},history:[],createdAt:1777903226629},
  {id:"pre_263",word:"bandwidth",meaning:"余裕、キャパシティ（仕事量の）",category:"ビジネス",level:3,phonetic:"",audioUS:"",audioUK:"",examples:["Do you have the bandwidth for this?","I don't have the bandwidth right now."],image:"",srs:{},history:[],createdAt:1777903286629},
  {id:"pre_264",word:"take offline",meaning:"後で個別に話す",category:"ビジネス",level:3,phonetic:"",audioUS:"",audioUK:"",examples:["Let's take this offline.","Can we take that conversation offline?"],image:"",srs:{},history:[],createdAt:1777903346629},
  {id:"pre_265",word:"loop in",meaning:"話し合いに加える、共有する",category:"ビジネス",level:2,phonetic:"",audioUS:"",audioUK:"",examples:["Can you loop in the design team?","I'll loop you in on the email."],image:"",srs:{},history:[],createdAt:1777903406629},
  {id:"pre_266",word:"ballpark",meaning:"おおよその数字",category:"ビジネス",level:2,phonetic:"",audioUS:"",audioUK:"",examples:["Can you give me a ballpark figure?","Ballpark, it'll cost around $10,000."],image:"",srs:{},history:[],createdAt:1777903466629},
  {id:"pre_267",word:"push back",meaning:"反論する",category:"ビジネス",level:2,phonetic:"",audioUS:"",audioUK:"",examples:["The client might push back on the price.","Don't be afraid to push back."],image:"",srs:{},history:[],createdAt:1777903526629},
  {id:"pre_268",word:"pain point",meaning:"問題点、課題",category:"ビジネス",level:2,phonetic:"",audioUS:"",audioUK:"",examples:["What are the main pain points?","Address the customer's pain points."],image:"",srs:{},history:[],createdAt:1777903586629},
  {id:"pre_269",word:"move the needle",meaning:"効果を出す",category:"ビジネス",level:3,phonetic:"",audioUS:"",audioUK:"",examples:["This campaign really moved the needle.","What can we do to move the needle?"],image:"",srs:{},history:[],createdAt:1777903646629},
  {id:"pre_270",word:"low-hanging fruit",meaning:"簡単に達成できる目標",category:"ビジネス",level:3,phonetic:"",audioUS:"",audioUK:"",examples:["Let's start with the low-hanging fruit.","Pick the low-hanging fruit first."],image:"",srs:{},history:[],createdAt:1777903706629},
  {id:"pre_271",word:"synergy",meaning:"相乗効果",category:"ビジネス",level:3,phonetic:"",audioUS:"",audioUK:"",examples:["There's real synergy between our teams.","The merger created synergy."],image:"",srs:{},history:[],createdAt:1777903766629},
  {id:"pre_272",word:"deliverable",meaning:"成果物、納品物",category:"ビジネス",level:3,phonetic:"",audioUS:"",audioUK:"",examples:["What are the key deliverables?","All deliverables are due by Friday."],image:"",srs:{},history:[],createdAt:1777903826629},
  {id:"pre_273",word:"stakeholder",meaning:"関係者、利害関係者",category:"ビジネス",level:3,phonetic:"",audioUS:"",audioUK:"",examples:["We need buy-in from all stakeholders.","Present to stakeholders on Thursday."],image:"",srs:{},history:[],createdAt:1777903886629},
  {id:"pre_274",word:"action item",meaning:"実施すべき事項",category:"ビジネス",level:2,phonetic:"",audioUS:"",audioUK:"",examples:["Let's list the action items.","Every meeting ends with action items."],image:"",srs:{},history:[],createdAt:1777903946629},
  {id:"pre_275",word:"deep dive",meaning:"詳しく掘り下げる",category:"ビジネス",level:2,phonetic:"",audioUS:"",audioUK:"",examples:["Let's do a deep dive into the data.","We need to deep dive on this issue."],image:"",srs:{},history:[],createdAt:1777904006629},
  {id:"pre_276",word:"scalable",meaning:"拡張可能な",category:"ビジネス",level:3,phonetic:"",audioUS:"",audioUK:"",examples:["Is this model scalable?","We need a scalable solution."],image:"",srs:{},history:[],createdAt:1777904066629},
  {id:"pre_277",word:"leverage",meaning:"活用する",category:"ビジネス",level:3,phonetic:"",audioUS:"",audioUK:"",examples:["We can leverage our existing network.","Let's leverage this opportunity."],image:"",srs:{},history:[],createdAt:1777904126629},
  {id:"pre_278",word:"pivot",meaning:"方向転換する",category:"ビジネス",level:3,phonetic:"",audioUS:"",audioUK:"",examples:["We need to pivot our strategy.","The startup pivoted after user feedback."],image:"",srs:{},history:[],createdAt:1777904186629},
  {id:"pre_279",word:"value proposition",meaning:"価値提案",category:"ビジネス",level:3,phonetic:"",audioUS:"",audioUK:"",examples:["What's our value proposition?","Clarify the value proposition first."],image:"",srs:{},history:[],createdAt:1777904246629},
  {id:"pre_280",word:"ROI",meaning:"投資対効果",category:"ビジネス",level:3,phonetic:"",audioUS:"",audioUK:"",examples:["What's the ROI on this?","We need to show ROI by Q4."],image:"",srs:{},history:[],createdAt:1777904306629},
  {id:"pre_281",word:"KPI",meaning:"重要業績評価指標",category:"ビジネス",level:3,phonetic:"",audioUS:"",audioUK:"",examples:["We need to hit our KPIs.","What are the KPIs for this project?"],image:"",srs:{},history:[],createdAt:1777904366629},
  {id:"pre_282",word:"onboarding",meaning:"新入社員・顧客の受け入れ",category:"ビジネス",level:2,phonetic:"",audioUS:"",audioUK:"",examples:["The onboarding process takes two weeks.","She's still in onboarding."],image:"",srs:{},history:[],createdAt:1777904426629},
  {id:"pre_283",word:"buy-in",meaning:"賛同、承認",category:"ビジネス",level:3,phonetic:"",audioUS:"",audioUK:"",examples:["We need buy-in from leadership.","Getting buy-in is the hardest part."],image:"",srs:{},history:[],createdAt:1777904486629},
  {id:"pre_284",word:"alignment",meaning:"方向性の一致",category:"ビジネス",level:3,phonetic:"",audioUS:"",audioUK:"",examples:["We need alignment across teams.","Let's make sure there's full alignment."],image:"",srs:{},history:[],createdAt:1777904546629},
  {id:"pre_285",word:"greenlight",meaning:"承認する",category:"ビジネス",level:2,phonetic:"",audioUS:"",audioUK:"",examples:["The project got greenlighted.","We're waiting for the greenlight."],image:"",srs:{},history:[],createdAt:1777904606629},
  {id:"pre_286",word:"bottleneck",meaning:"ボトルネック",category:"ビジネス",level:2,phonetic:"",audioUS:"",audioUK:"",examples:["Where's the bottleneck in the process?","Fix the bottleneck first."],image:"",srs:{},history:[],createdAt:1777904666629},
  {id:"pre_287",word:"pipeline",meaning:"パイプライン、案件",category:"ビジネス",level:3,phonetic:"",audioUS:"",audioUK:"",examples:["What's in our sales pipeline?","We have a strong pipeline this quarter."],image:"",srs:{},history:[],createdAt:1777904726629},
  {id:"pre_288",word:"north star",meaning:"最終目標、指針",category:"ビジネス",level:3,phonetic:"",audioUS:"",audioUK:"",examples:["What's our north star metric?","Keep the north star in mind."],image:"",srs:{},history:[],createdAt:1777904786629},
  {id:"pre_289",word:"game plan",meaning:"計画、戦略",category:"ビジネス",level:2,phonetic:"",audioUS:"",audioUK:"",examples:["What's the game plan for tomorrow?","Let's review the game plan."],image:"",srs:{},history:[],createdAt:1777904846629},
  {id:"pre_290",word:"roadmap",meaning:"計画の工程表、進行計画",category:"ビジネス",level:2,phonetic:"",audioUS:"",audioUK:"",examples:["Share the product roadmap.","The roadmap outlines our priorities."],image:"",srs:{},history:[],createdAt:1777904906629},
  {id:"pre_291",word:"milestone",meaning:"マイルストーン、節目",category:"ビジネス",level:2,phonetic:"",audioUS:"",audioUK:"",examples:["We hit a major milestone.","What's the next milestone?"],image:"",srs:{},history:[],createdAt:1777904966629},
  {id:"pre_292",word:"sign off on",meaning:"最終承認する",category:"ビジネス",level:2,phonetic:"",audioUS:"",audioUK:"",examples:["Can you sign off on this budget?","We need the CEO to sign off."],image:"",srs:{},history:[],createdAt:1777905026629},
  {id:"pre_293",word:"elevator pitch",meaning:"短い売り込み、要約プレゼン",category:"ビジネス",level:2,phonetic:"",audioUS:"",audioUK:"",examples:["Practice your elevator pitch.","Give me your elevator pitch in 60 seconds."],image:"",srs:{},history:[],createdAt:1777905086629},
  {id:"pre_294",word:"mission critical",meaning:"最重要の",category:"ビジネス",level:3,phonetic:"",audioUS:"",audioUK:"",examples:["This is mission critical.","Treat it as mission critical."],image:"",srs:{},history:[],createdAt:1777905146629},
  {id:"pre_295",word:"quick sync",meaning:"短いミーティング",category:"ビジネス",level:2,phonetic:"",audioUS:"",audioUK:"",examples:["Can we do a quick sync?","Let's do a quick sync before the call."],image:"",srs:{},history:[],createdAt:1777905206629},
  {id:"pre_296",word:"stand-up",meaning:"立ったままの短いチームミーティング（毎日の進捗共有）",category:"ビジネス",level:2,phonetic:"",audioUS:"",audioUK:"",examples:["We have stand-up at 9 AM.","Don't miss the daily stand-up."],image:"",srs:{},history:[],createdAt:1777905266629},
  {id:"pre_297",word:"proactive",meaning:"先手を打つ、積極的な",category:"ビジネス",level:2,phonetic:"",audioUS:"",audioUK:"",examples:["Be proactive about communication.","She's always proactive."],image:"",srs:{},history:[],createdAt:1777905326629},
  {id:"pre_298",word:"streamline",meaning:"効率化する",category:"ビジネス",level:2,phonetic:"",audioUS:"",audioUK:"",examples:["We need to streamline the process.","Streamline the onboarding steps."],image:"",srs:{},history:[],createdAt:1777905386629},
  {id:"pre_299",word:"optimize",meaning:"最適化する",category:"ビジネス",level:2,phonetic:"",audioUS:"",audioUK:"",examples:["We need to optimize performance.","Optimize the workflow."],image:"",srs:{},history:[],createdAt:1777905446629},
  {id:"pre_300",word:"benchmark",meaning:"基準値、比較する",category:"ビジネス",level:3,phonetic:"",audioUS:"",audioUK:"",examples:["What's the industry benchmark?","Let's benchmark against competitors."],image:"",srs:{},history:[],createdAt:1777905506629},
  {id:"pre_301",word:"go-to-market",meaning:"市場投入戦略",category:"ビジネス",level:3,phonetic:"",audioUS:"",audioUK:"",examples:["What's the go-to-market strategy?","Finalize the go-to-market plan."],image:"",srs:{},history:[],createdAt:1777905566629},
  {id:"pre_302",word:"best practice",meaning:"ベストプラクティス",category:"ビジネス",level:2,phonetic:"",audioUS:"",audioUK:"",examples:["Follow industry best practices.","What's the best practice here?"],image:"",srs:{},history:[],createdAt:1777905626629},
  {id:"pre_303",word:"empower",meaning:"力を与える",category:"ビジネス",level:2,phonetic:"",audioUS:"",audioUK:"",examples:["We want to empower our employees.","Empower your team to make decisions."],image:"",srs:{},history:[],createdAt:1777905686629},
  {id:"pre_304",word:"incentivize",meaning:"動機付ける",category:"ビジネス",level:3,phonetic:"",audioUS:"",audioUK:"",examples:["We need to incentivize performance.","Incentivize the sales team."],image:"",srs:{},history:[],createdAt:1777905746629},
  {id:"pre_305",word:"disruptive",meaning:"業界を変える、革新的な",category:"ビジネス",level:3,phonetic:"",audioUS:"",audioUK:"",examples:["It's a disruptive technology.","That startup is truly disruptive."],image:"",srs:{},history:[],createdAt:1777905806629},
  {id:"pre_306",word:"transparency",meaning:"透明性",category:"ビジネス",level:2,phonetic:"",audioUS:"",audioUK:"",examples:["We value transparency here.","Transparency builds trust."],image:"",srs:{},history:[],createdAt:1777905866629},
  {id:"pre_307",word:"accountability",meaning:"責任感、説明責任",category:"ビジネス",level:2,phonetic:"",audioUS:"",audioUK:"",examples:["There needs to be more accountability.","Hold everyone accountable."],image:"",srs:{},history:[],createdAt:1777905926629},
  {id:"pre_308",word:"core competency",meaning:"中核的能力、強み",category:"ビジネス",level:3,phonetic:"",audioUS:"",audioUK:"",examples:["What's our core competency?","Focus on your core competency."],image:"",srs:{},history:[],createdAt:1777905986629},
  {id:"pre_309",word:"cross-functional",meaning:"部門横断的な",category:"ビジネス",level:3,phonetic:"",audioUS:"",audioUK:"",examples:["This is a cross-functional project.","Build a cross-functional team."],image:"",srs:{},history:[],createdAt:1777906046629},
  {id:"pre_310",word:"end-to-end",meaning:"端から端まで、全工程",category:"ビジネス",level:3,phonetic:"",audioUS:"",audioUK:"",examples:["We handle end-to-end delivery.","Own the end-to-end process."],image:"",srs:{},history:[],createdAt:1777906106629},
  {id:"pre_311",word:"hands-on",meaning:"実践的な",category:"ビジネス",level:2,phonetic:"",audioUS:"",audioUK:"",examples:["He's very hands-on as a manager.","We need someone hands-on for this."],image:"",srs:{},history:[],createdAt:1777906166629},
  {id:"pre_312",word:"facilitate",meaning:"促進する、取り仕切る",category:"ビジネス",level:3,phonetic:"",audioUS:"",audioUK:"",examples:["She'll facilitate the meeting.","Our goal is to facilitate collaboration."],image:"",srs:{},history:[],createdAt:1777906226629},
  {id:"pre_313",word:"scalability",meaning:"拡張性",category:"ビジネス",level:3,phonetic:"",audioUS:"",audioUK:"",examples:["We need to consider scalability.","Scalability is key to growth."],image:"",srs:{},history:[],createdAt:1777906286629},
  {id:"pre_314",word:"turnaround",meaning:"業績回復、転換",category:"ビジネス",level:3,phonetic:"",audioUS:"",audioUK:"",examples:["The company needs a turnaround.","Impressive turnaround in just one year."],image:"",srs:{},history:[],createdAt:1777906346629},
  {id:"pre_315",word:"outcome-driven",meaning:"成果重視の",category:"ビジネス",level:3,phonetic:"",audioUS:"",audioUK:"",examples:["We're outcome-driven here.","Take an outcome-driven approach."],image:"",srs:{},history:[],createdAt:1777906406629},
  {id:"pre_316",word:"client-facing",meaning:"顧客対応の",category:"ビジネス",level:2,phonetic:"",audioUS:"",audioUK:"",examples:["This is a client-facing role.","Review all client-facing materials."],image:"",srs:{},history:[],createdAt:1777906466629},
  {id:"pre_317",word:"headcount",meaning:"人員数",category:"ビジネス",level:3,phonetic:"",audioUS:"",audioUK:"",examples:["We're adding headcount next quarter.","What's the current headcount?"],image:"",srs:{},history:[],createdAt:1777906526629},
  {id:"pre_318",word:"jet lag",meaning:"時差ぼけ",category:"旅行",level:1,phonetic:"",audioUS:"",audioUK:"",examples:["I'm still recovering from jet lag.","Jet lag hit me hard after the flight."],image:"",srs:{},history:[],createdAt:1777906586629},
  {id:"pre_319",word:"off the beaten path",meaning:"穴場の、観光地から外れた",category:"旅行",level:3,phonetic:"",audioUS:"",audioUK:"",examples:["We found a café off the beaten path.","I love traveling off the beaten path."],image:"",srs:{},history:[],createdAt:1777906646629},
  {id:"pre_320",word:"tourist trap",meaning:"観光客向けのぼったくり場所",category:"旅行",level:2,phonetic:"",audioUS:"",audioUK:"",examples:["That place near the tower is a tourist trap.","Avoid tourist traps — eat where locals eat."],image:"",srs:{},history:[],createdAt:1777906706629},
  {id:"pre_321",word:"local gem",meaning:"地元の隠れた名所",category:"旅行",level:2,phonetic:"",audioUS:"",audioUK:"",examples:["This café is a real local gem.","Ask locals — they know all the local gems."],image:"",srs:{},history:[],createdAt:1777906766629},
  {id:"pre_322",word:"check in",meaning:"チェックインする",category:"旅行",level:1,phonetic:"",audioUS:"",audioUK:"",examples:["We can check in after 3 PM.","Check in online to save time."],image:"",srs:{},history:[],createdAt:1777906826629},
  {id:"pre_323",word:"layover",meaning:"乗り継ぎ待ち",category:"旅行",level:2,phonetic:"",audioUS:"",audioUK:"",examples:["I have a 6-hour layover in Dubai.","A long layover can actually be a bonus."],image:"",srs:{},history:[],createdAt:1777906886629},
  {id:"pre_324",word:"all-inclusive",meaning:"全込み",category:"旅行",level:2,phonetic:"",audioUS:"",audioUK:"",examples:["We booked an all-inclusive resort.","Is this all-inclusive or extra?"],image:"",srs:{},history:[],createdAt:1777906946629},
  {id:"pre_325",word:"wander",meaning:"ぶらぶら歩く",category:"旅行",level:1,phonetic:"",audioUS:"",audioUK:"",examples:["We just wandered through the old town.","I love to wander without a plan."],image:"",srs:{},history:[],createdAt:1777907006629},
  {id:"pre_326",word:"bucket list",meaning:"死ぬまでにやりたいことリスト",category:"旅行",level:1,phonetic:"",audioUS:"",audioUK:"",examples:["Japan is on my bucket list.","Crossing bucket list items off feels amazing."],image:"",srs:{},history:[],createdAt:1777907066629},
  {id:"pre_327",word:"travel hack",meaning:"旅のテクニック・裏技",category:"旅行",level:2,phonetic:"",audioUS:"",audioUK:"",examples:["A great travel hack: book on Tuesday.","Pack light — that's the best travel hack."],image:"",srs:{},history:[],createdAt:1777907126629},
  {id:"pre_328",word:"road trip",meaning:"車旅、ロードトリップ",category:"旅行",level:1,phonetic:"",audioUS:"",audioUK:"",examples:["Let's do a road trip this summer.","Road trips are the best way to explore."],image:"",srs:{},history:[],createdAt:1777907186629},
  {id:"pre_329",word:"backpacking",meaning:"バックパッキング旅行",category:"旅行",level:2,phonetic:"",audioUS:"",audioUK:"",examples:["I went backpacking through Europe.","Backpacking teaches you to travel light."],image:"",srs:{},history:[],createdAt:1777907246629},
  {id:"pre_330",word:"solo travel",meaning:"一人旅",category:"旅行",level:2,phonetic:"",audioUS:"",audioUK:"",examples:["Solo travel changed my perspective.","Solo travel builds independence."],image:"",srs:{},history:[],createdAt:1777907306629},
  {id:"pre_331",word:"itinerary",meaning:"旅程表、スケジュール",category:"旅行",level:2,phonetic:"",audioUS:"",audioUK:"",examples:["What's our itinerary for day two?","I'll send over the full itinerary."],image:"",srs:{},history:[],createdAt:1777907366629},
  {id:"pre_332",word:"sightseeing",meaning:"観光",category:"旅行",level:1,phonetic:"",audioUS:"",audioUK:"",examples:["We spent the day sightseeing.","Any sightseeing recommendations?"],image:"",srs:{},history:[],createdAt:1777907426629},
  {id:"pre_333",word:"day trip",meaning:"日帰り旅行",category:"旅行",level:1,phonetic:"",audioUS:"",audioUK:"",examples:["We did a day trip to Kyoto.","Perfect for a day trip from Tokyo."],image:"",srs:{},history:[],createdAt:1777907486629},
  {id:"pre_334",word:"guided tour",meaning:"ガイドツアー",category:"旅行",level:1,phonetic:"",audioUS:"",audioUK:"",examples:["We joined a guided tour of the castle.","The guided tour was very informative."],image:"",srs:{},history:[],createdAt:1777907546629},
  {id:"pre_335",word:"hidden gem",meaning:"知られていない名所",category:"旅行",level:2,phonetic:"",audioUS:"",audioUK:"",examples:["That restaurant is a hidden gem.","The city is full of hidden gems."],image:"",srs:{},history:[],createdAt:1777907606629},
  {id:"pre_336",word:"must-see",meaning:"必見の",category:"旅行",level:1,phonetic:"",audioUS:"",audioUK:"",examples:["The old town is a must-see.","What are the must-sees here?"],image:"",srs:{},history:[],createdAt:1777907666629},
  {id:"pre_337",word:"off-season",meaning:"オフシーズン",category:"旅行",level:2,phonetic:"",audioUS:"",audioUK:"",examples:["Travel off-season to avoid crowds.","Prices drop during off-season."],image:"",srs:{},history:[],createdAt:1777907726629},
  {id:"pre_338",word:"peak season",meaning:"ピークシーズン",category:"旅行",level:2,phonetic:"",audioUS:"",audioUK:"",examples:["Avoid traveling during peak season.","Prices soar during peak season."],image:"",srs:{},history:[],createdAt:1777907786629},
  {id:"pre_339",word:"book in advance",meaning:"事前予約する",category:"旅行",level:2,phonetic:"",audioUS:"",audioUK:"",examples:["Book in advance to get better rates.","Restaurants here require booking in advance."],image:"",srs:{},history:[],createdAt:1777907846629},
  {id:"pre_340",word:"last-minute",meaning:"ギリギリの、直前の",category:"旅行",level:2,phonetic:"",audioUS:"",audioUK:"",examples:["I got a last-minute deal on flights.","We made a last-minute decision to go."],image:"",srs:{},history:[],createdAt:1777907906629},
  {id:"pre_341",word:"travel insurance",meaning:"旅行保険",category:"旅行",level:2,phonetic:"",audioUS:"",audioUK:"",examples:["Always get travel insurance.","Travel insurance saved us on that trip."],image:"",srs:{},history:[],createdAt:1777907966629},
  {id:"pre_342",word:"customs",meaning:"税関",category:"旅行",level:1,phonetic:"",audioUS:"",audioUK:"",examples:["Don't forget to fill out customs forms.","Customs can take a while at this airport."],image:"",srs:{},history:[],createdAt:1777908026629},
  {id:"pre_343",word:"duty-free",meaning:"免税",category:"旅行",level:1,phonetic:"",audioUS:"",audioUK:"",examples:["I picked up perfume at duty-free.","What's available at duty-free?"],image:"",srs:{},history:[],createdAt:1777908086629},
  {id:"pre_344",word:"carry-on",meaning:"機内持ち込み手荷物",category:"旅行",level:1,phonetic:"",audioUS:"",audioUK:"",examples:["I only travel with a carry-on.","Does this fit as a carry-on?"],image:"",srs:{},history:[],createdAt:1777908146629},
  {id:"pre_345",word:"connecting flight",meaning:"乗り継ぎ便",category:"旅行",level:1,phonetic:"",audioUS:"",audioUK:"",examples:["I have a connecting flight in Seoul.","My connecting flight was delayed."],image:"",srs:{},history:[],createdAt:1777908206629},
  {id:"pre_346",word:"redeye",meaning:"深夜便・早朝便",category:"旅行",level:2,phonetic:"",audioUS:"",audioUK:"",examples:["I took the redeye to save on hotels.","Redeyes are tough but cheap."],image:"",srs:{},history:[],createdAt:1777908266629},
  {id:"pre_347",word:"upgrade",meaning:"アップグレード",category:"旅行",level:2,phonetic:"",audioUS:"",audioUK:"",examples:["I got a free upgrade to business class.","Ask nicely — you might get an upgrade."],image:"",srs:{},history:[],createdAt:1777908326629},
  {id:"pre_348",word:"frequent flyer",meaning:"マイレージ会員",category:"旅行",level:2,phonetic:"",audioUS:"",audioUK:"",examples:["I've been a frequent flyer for 10 years.","Frequent flyer miles got me a free trip."],image:"",srs:{},history:[],createdAt:1777908386629},
  {id:"pre_349",word:"lounge access",meaning:"ラウンジ利用",category:"旅行",level:2,phonetic:"",audioUS:"",audioUK:"",examples:["My card gives lounge access.","Lounge access makes long layovers better."],image:"",srs:{},history:[],createdAt:1777908446629},
  {id:"pre_350",word:"culture shock",meaning:"カルチャーショック",category:"旅行",level:2,phonetic:"",audioUS:"",audioUK:"",examples:["Moving abroad gave me culture shock.","Culture shock is normal — it passes."],image:"",srs:{},history:[],createdAt:1777908506629},
  {id:"pre_351",word:"street food",meaning:"屋台グルメ",category:"旅行",level:1,phonetic:"",audioUS:"",audioUK:"",examples:["The street food here is amazing.","Don't miss the street food scene."],image:"",srs:{},history:[],createdAt:1777908566629},
  {id:"pre_352",word:"hole-in-the-wall",meaning:"小さくて目立たない名店",category:"旅行",level:2,phonetic:"",audioUS:"",audioUK:"",examples:["We found a hole-in-the-wall ramen place.","The best food is at hole-in-the-wall spots."],image:"",srs:{},history:[],createdAt:1777908626629},
  {id:"pre_353",word:"word of mouth",meaning:"口コミ",category:"旅行",level:2,phonetic:"",audioUS:"",audioUK:"",examples:["I found it through word of mouth.","Word of mouth recommendations are the best."],image:"",srs:{},history:[],createdAt:1777908686629},
  {id:"pre_354",word:"underrated",meaning:"過小評価されてる",category:"旅行",level:2,phonetic:"",audioUS:"",audioUK:"",examples:["That city is totally underrated.","This restaurant is underrated."],image:"",srs:{},history:[],createdAt:1777908746629},
  {id:"pre_355",word:"overrated",meaning:"過大評価されてる",category:"旅行",level:2,phonetic:"",audioUS:"",audioUK:"",examples:["The main attraction was honestly overrated.","That famous dish is a bit overrated."],image:"",srs:{},history:[],createdAt:1777908806629},
  {id:"pre_356",word:"avoid the crowds",meaning:"混雑を避ける",category:"旅行",level:2,phonetic:"",audioUS:"",audioUK:"",examples:["Go early to avoid the crowds.","Visit on weekdays to avoid the crowds."],image:"",srs:{},history:[],createdAt:1777908866629},
  {id:"pre_357",word:"travel on a shoestring",meaning:"超節約旅行をする",category:"旅行",level:3,phonetic:"",audioUS:"",audioUK:"",examples:["We traveled through Asia on a shoestring.","You can travel Europe on a shoestring."],image:"",srs:{},history:[],createdAt:1777908926629},
  {id:"pre_358",word:"splurge",meaning:"奮発する",category:"旅行",level:2,phonetic:"",audioUS:"",audioUK:"",examples:["We splurged on a fancy hotel.","Sometimes it's worth splurging."],image:"",srs:{},history:[],createdAt:1777908986629},
  {id:"pre_359",word:"complimentary",meaning:"無料の、サービスの",category:"旅行",level:2,phonetic:"",audioUS:"",audioUK:"",examples:["Breakfast is complimentary.","We got a complimentary upgrade."],image:"",srs:{},history:[],createdAt:1777909046629},
  {id:"pre_360",word:"concierge",meaning:"コンシェルジュ",category:"旅行",level:2,phonetic:"",audioUS:"",audioUK:"",examples:["Ask the concierge for recommendations.","The concierge arranged everything."],image:"",srs:{},history:[],createdAt:1777909106629},
  {id:"pre_361",word:"hop on hop off",meaning:"乗り降り自由の観光バス",category:"旅行",level:2,phonetic:"",audioUS:"",audioUK:"",examples:["We did a hop on hop off tour.","Hop on hop off is great for first-timers."],image:"",srs:{},history:[],createdAt:1777909166629},
  {id:"pre_362",word:"packing light",meaning:"荷物を少なく持つ",category:"旅行",level:2,phonetic:"",audioUS:"",audioUK:"",examples:["Packing light makes travel so much easier.","I'm learning the art of packing light."],image:"",srs:{},history:[],createdAt:1777909226629},
  {id:"pre_363",word:"travel essentials",meaning:"旅行必需品",category:"旅行",level:1,phonetic:"",audioUS:"",audioUK:"",examples:["What are your travel essentials?","Portable charger is a travel essential."],image:"",srs:{},history:[],createdAt:1777909286629},
  {id:"pre_364",word:"overpacking",meaning:"荷物を詰め過ぎる",category:"旅行",level:2,phonetic:"",audioUS:"",audioUK:"",examples:["I always regret overpacking.","Overpacking is a rookie mistake."],image:"",srs:{},history:[],createdAt:1777909346629},
  {id:"pre_365",word:"window seat",meaning:"窓側席",category:"旅行",level:1,phonetic:"",audioUS:"",audioUK:"",examples:["I always ask for a window seat.","Window seat or aisle?"],image:"",srs:{},history:[],createdAt:1777909406629},
  {id:"pre_366",word:"aisle seat",meaning:"通路側席",category:"旅行",level:1,phonetic:"",audioUS:"",audioUK:"",examples:["I prefer an aisle seat for long flights.","Aisle seat gives you more room."],image:"",srs:{},history:[],createdAt:1777909466629},
  {id:"pre_367",word:"safe travels",meaning:"気をつけて、良い旅を",category:"旅行",level:1,phonetic:"",audioUS:"",audioUK:"",examples:["Safe travels — see you when you're back.","Safe travels! Text me when you land."],image:"",srs:{},history:[],createdAt:1777909526629},
  {id:"pre_368",word:"wanderlust",meaning:"旅への強い欲求",category:"旅行",level:2,phonetic:"",audioUS:"",audioUK:"",examples:["I have serious wanderlust right now.","The wanderlust is real — I need a trip."],image:"",srs:{},history:[],createdAt:1777909586629},
  {id:"pre_369",word:"travel bug",meaning:"旅行熱",category:"旅行",level:2,phonetic:"",audioUS:"",audioUK:"",examples:["I caught the travel bug in college.","She's got the travel bug bad."],image:"",srs:{},history:[],createdAt:1777909646629},
  {id:"pre_370",word:"scenic route",meaning:"景色のいいルート",category:"旅行",level:2,phonetic:"",audioUS:"",audioUK:"",examples:["Let's take the scenic route.","The scenic route added an hour but was worth it."],image:"",srs:{},history:[],createdAt:1777909706629},
  {id:"pre_371",word:"souvenir",meaning:"お土産",category:"旅行",level:1,phonetic:"",audioUS:"",audioUK:"",examples:["I bought souvenirs for everyone.","What's a good souvenir from here?"],image:"",srs:{},history:[],createdAt:1777909766629},
  {id:"pre_372",word:"exchange rate",meaning:"為替レート",category:"旅行",level:1,phonetic:"",audioUS:"",audioUK:"",examples:["What's the exchange rate today?","Check the exchange rate before you go."],image:"",srs:{},history:[],createdAt:1777909826629},
  {id:"pre_373",word:"round trip",meaning:"往復",category:"旅行",level:1,phonetic:"",audioUS:"",audioUK:"",examples:["I need a round trip ticket.","Round trip flights are usually cheaper."],image:"",srs:{},history:[],createdAt:1777909886629},
  {id:"pre_374",word:"one-way",meaning:"片道",category:"旅行",level:1,phonetic:"",audioUS:"",audioUK:"",examples:["Just a one-way — I'm not sure when I'll return.","One-way tickets can be flexible."],image:"",srs:{},history:[],createdAt:1777909946629},
  {id:"pre_375",word:"jet-setter",meaning:"頻繁に旅行する人",category:"旅行",level:3,phonetic:"",audioUS:"",audioUK:"",examples:["She's a total jet-setter.","Living like a jet-setter this month."],image:"",srs:{},history:[],createdAt:1777910006629},
  {id:"pre_376",word:"no-frills",meaning:"飾り気のない、最低限の",category:"旅行",level:2,phonetic:"",audioUS:"",audioUK:"",examples:["It's a no-frills hotel but comfortable.","I prefer no-frills travel."],image:"",srs:{},history:[],createdAt:1777910066629},
  {id:"pre_377",word:"passport control",meaning:"入国審査",category:"旅行",level:1,phonetic:"",audioUS:"",audioUK:"",examples:["Passport control took forever.","Have your documents ready at passport control."],image:"",srs:{},history:[],createdAt:1777910126629},
  {id:"pre_378",word:"time zone",meaning:"タイムゾーン",category:"旅行",level:1,phonetic:"",audioUS:"",audioUK:"",examples:["What time zone are you in?","I keep forgetting the time zone difference."],image:"",srs:{},history:[],createdAt:1777910186629},
  // ===== 単語単体 (日常会話) =====
  {id:"pre_379",word:"apologize",meaning:"謝る、お詫びする",category:"日常会話",level:2,phonetic:"/əˈpɒlədʒaɪz/",audioUS:"",audioUK:"",examples:["I want to apologize for being late.","He apologized sincerely to his friend."],image:"",srs:{},history:[],createdAt:1777910246629},
  {id:"pre_380",word:"grateful",meaning:"感謝している",category:"日常会話",level:2,phonetic:"/ˈɡreɪtfəl/",audioUS:"",audioUK:"",examples:["I'm so grateful for your help.","She felt grateful for the opportunity."],image:"",srs:{},history:[],createdAt:1777910306629},
  {id:"pre_381",word:"nervous",meaning:"緊張した、不安な",category:"日常会話",level:1,phonetic:"/ˈnɜːrvəs/",audioUS:"",audioUK:"",examples:["I'm really nervous about the interview.","He gets nervous before big speeches."],image:"",srs:{},history:[],createdAt:1777910366629},
  {id:"pre_382",word:"exhausted",meaning:"ぐったり疲れた",category:"日常会話",level:2,phonetic:"/ɪɡˈzɔːstɪd/",audioUS:"",audioUK:"",examples:["I'm completely exhausted after that meeting.","She was exhausted from the long trip."],image:"",srs:{},history:[],createdAt:1777910426629},
  {id:"pre_383",word:"confused",meaning:"困惑した、混乱した",category:"日常会話",level:2,phonetic:"/kənˈfjuːzd/",audioUS:"",audioUK:"",examples:["I'm a little confused about the plan.","His explanation left everyone confused."],image:"",srs:{},history:[],createdAt:1777910486629},
  {id:"pre_384",word:"relieved",meaning:"安堵した、ほっとした",category:"日常会話",level:2,phonetic:"/rɪˈliːvd/",audioUS:"",audioUK:"",examples:["I'm so relieved it all worked out.","She was relieved to hear the good news."],image:"",srs:{},history:[],createdAt:1777910546629},
  {id:"pre_385",word:"overwhelmed",meaning:"圧倒された、手に負えない気持ち",category:"日常会話",level:3,phonetic:"/ˌoʊvərˈwelmd/",audioUS:"",audioUK:"",examples:["I feel overwhelmed with all this work.","She was overwhelmed with gratitude."],image:"",srs:{},history:[],createdAt:1777910606629},
  {id:"pre_386",word:"awkward",meaning:"気まずい、ぎこちない",category:"日常会話",level:2,phonetic:"/ˈɔːkwərd/",audioUS:"",audioUK:"",examples:["That was an awkward silence.","The situation felt really awkward."],image:"",srs:{},history:[],createdAt:1777910666629},
  {id:"pre_387",word:"reliable",meaning:"信頼できる、頼りになる",category:"日常会話",level:2,phonetic:"/rɪˈlaɪəbl/",audioUS:"",audioUK:"",examples:["She's the most reliable person on the team.","You need a reliable car for that trip."],image:"",srs:{},history:[],createdAt:1777910726629},
  {id:"pre_388",word:"hilarious",meaning:"爆笑もの、とても面白い",category:"日常会話",level:2,phonetic:"/hɪˈleriəs/",audioUS:"",audioUK:"",examples:["That movie was absolutely hilarious.","He's hilarious when he's tired."],image:"",srs:{},history:[],createdAt:1777910786629},
  {id:"pre_389",word:"jealous",meaning:"嫉妬した、うらやましい",category:"日常会話",level:1,phonetic:"/ˈdʒeləs/",audioUS:"",audioUK:"",examples:["I'm so jealous of your trip to Japan.","He got jealous when she talked to him."],image:"",srs:{},history:[],createdAt:1777910846629},
  {id:"pre_390",word:"stubborn",meaning:"頑固な、意地っ張り",category:"日常会話",level:2,phonetic:"/ˈstʌbərn/",audioUS:"",audioUK:"",examples:["He's too stubborn to admit he's wrong.","Don't be so stubborn about it."],image:"",srs:{},history:[],createdAt:1777910906629},
  {id:"pre_391",word:"genuine",meaning:"本物の、心からの",category:"日常会話",level:3,phonetic:"/ˈdʒenjuɪn/",audioUS:"",audioUK:"",examples:["Her smile seemed completely genuine.","He gave a genuine apology."],image:"",srs:{},history:[],createdAt:1777910966629},
  {id:"pre_392",word:"craving",meaning:"強く欲しい、食べたくて仕方ない",category:"日常会話",level:2,phonetic:"/ˈkreɪvɪŋ/",audioUS:"",audioUK:"",examples:["I'm craving ramen right now.","She had a sudden craving for ice cream."],image:"",srs:{},history:[],createdAt:1777911026629},
  {id:"pre_393",word:"clumsy",meaning:"不器用な、ドジな",category:"日常会話",level:2,phonetic:"/ˈklʌmzi/",audioUS:"",audioUK:"",examples:["I'm so clumsy — I spilled my coffee again.","He's always been a bit clumsy."],image:"",srs:{},history:[],createdAt:1777911086629},
  // ===== 単語単体 (スラング) =====
  {id:"pre_394",word:"dope",meaning:"最高、かっこいい",category:"スラング",level:1,phonetic:"/doʊp/",audioUS:"",audioUK:"",examples:["That new song is so dope.","His sneakers are dope."],image:"",srs:{},history:[],createdAt:1777911146629},
  {id:"pre_395",word:"sketchy",meaning:"怪しい、信用できない",category:"スラング",level:2,phonetic:"/ˈskɛtʃi/",audioUS:"",audioUK:"",examples:["This neighborhood seems a bit sketchy.","That deal sounds really sketchy."],image:"",srs:{},history:[],createdAt:1777911206629},
  {id:"pre_396",word:"savage",meaning:"容赦ない、強烈、すごい",category:"スラング",level:2,phonetic:"/ˈsævɪdʒ/",audioUS:"",audioUK:"",examples:["That comeback was savage.","She was savage in the debate."],image:"",srs:{},history:[],createdAt:1777911266629},
  {id:"pre_397",word:"petty",meaning:"器が小さい、ちっちゃいことにこだわる",category:"スラング",level:2,phonetic:"/ˈpeti/",audioUS:"",audioUK:"",examples:["Stop being so petty about that.","She's petty enough to unfollow him."],image:"",srs:{},history:[],createdAt:1777911326629},
  {id:"pre_398",word:"obsessed",meaning:"取り憑かれた、どハマりしてる",category:"スラング",level:2,phonetic:"/əbˈsest/",audioUS:"",audioUK:"",examples:["I'm obsessed with this new show.","She's completely obsessed with that band."],image:"",srs:{},history:[],createdAt:1777911386629},
  {id:"pre_399",word:"unbothered",meaning:"動じない、全然気にしない",category:"スラング",level:2,phonetic:"/ʌnˈbɒðərd/",audioUS:"",audioUK:"",examples:["She's unbothered by the criticism.","He walked away completely unbothered."],image:"",srs:{},history:[],createdAt:1777911446629},
  {id:"pre_400",word:"triggered",meaning:"激怒した、傷ついた",category:"スラング",level:2,phonetic:"/ˈtrɪɡərd/",audioUS:"",audioUK:"",examples:["That comment really triggered me.","He gets triggered by small things."],image:"",srs:{},history:[],createdAt:1777911506629},
  {id:"pre_401",word:"finesse",meaning:"うまくやってのける、巧みに立ち回る",category:"スラング",level:3,phonetic:"/fɪˈnes/",audioUS:"",audioUK:"",examples:["He finessed his way into the VIP section.","She finessed the whole situation."],image:"",srs:{},history:[],createdAt:1777911566629},
  {id:"pre_402",word:"canceled",meaning:"社会的に制裁された、追放された",category:"スラング",level:3,phonetic:"/ˈkænsəld/",audioUS:"",audioUK:"",examples:["That influencer got canceled last week.","Being canceled on social media is serious."],image:"",srs:{},history:[],createdAt:1777911626629},
  {id:"pre_403",word:"feral",meaning:"ぶっ飛んでる、完全に限界",category:"スラング",level:3,phonetic:"/ˈfɪərəl/",audioUS:"",audioUK:"",examples:["I went feral after staying up all night.","She's acting feral at this party."],image:"",srs:{},history:[],createdAt:1777911686629},
  // ===== 単語単体 (口語表現) =====
  {id:"pre_404",word:"absolutely",meaning:"全くその通り、もちろん",category:"口語表現",level:1,phonetic:"/ˈæbsəluːtli/",audioUS:"",audioUK:"",examples:["Absolutely, I'll be there.","That's absolutely right."],image:"",srs:{},history:[],createdAt:1777911746629},
  {id:"pre_405",word:"exactly",meaning:"まさにその通り",category:"口語表現",level:1,phonetic:"/ɪɡˈzæktli/",audioUS:"",audioUK:"",examples:["Exactly! That's what I was thinking.","That's exactly what I needed."],image:"",srs:{},history:[],createdAt:1777911806629},
  {id:"pre_406",word:"apparently",meaning:"どうやら〜らしい",category:"口語表現",level:2,phonetic:"/əˈpærəntli/",audioUS:"",audioUK:"",examples:["Apparently, she quit her job.","Apparently they're dating now."],image:"",srs:{},history:[],createdAt:1777911866629},
  {id:"pre_407",word:"definitely",meaning:"絶対に、確実に",category:"口語表現",level:1,phonetic:"/ˈdefɪnɪtli/",audioUS:"",audioUK:"",examples:["Definitely — count me in.","I'll definitely be there."],image:"",srs:{},history:[],createdAt:1777911926629},
  {id:"pre_408",word:"obviously",meaning:"明らかに、当然",category:"口語表現",level:1,phonetic:"/ˈɒbviəsli/",audioUS:"",audioUK:"",examples:["Obviously, that's not okay.","She was obviously upset."],image:"",srs:{},history:[],createdAt:1777911986629},
  {id:"pre_409",word:"technically",meaning:"厳密に言えば、技術的には",category:"口語表現",level:2,phonetic:"/ˈteknɪkəli/",audioUS:"",audioUK:"",examples:["Technically, you're right.","Technically it's not against the rules."],image:"",srs:{},history:[],createdAt:1777912046629},
  {id:"pre_410",word:"supposedly",meaning:"〜とされているが、建前では",category:"口語表現",level:3,phonetic:"/səˈpoʊzɪdli/",audioUS:"",audioUK:"",examples:["Supposedly, it's the best restaurant here.","He's supposedly an expert."],image:"",srs:{},history:[],createdAt:1777912106629},
  {id:"pre_411",word:"randomly",meaning:"突然、なんとなく、唐突に",category:"口語表現",level:2,phonetic:"/ˈrændəmli/",audioUS:"",audioUK:"",examples:["She randomly texted me last night.","He randomly showed up at the party."],image:"",srs:{},history:[],createdAt:1777912166629},
  {id:"pre_412",word:"presumably",meaning:"おそらく、たぶん",category:"口語表現",level:3,phonetic:"/prɪˈzjuːməbli/",audioUS:"",audioUK:"",examples:["Presumably, she already knows.","Presumably, they'll be late again."],image:"",srs:{},history:[],createdAt:1777912226629},
  {id:"pre_413",word:"simultaneously",meaning:"同時に",category:"口語表現",level:3,phonetic:"/ˌsɪməlˈteɪniəsli/",audioUS:"",audioUK:"",examples:["We both said it simultaneously.","The app runs on multiple devices simultaneously."],image:"",srs:{},history:[],createdAt:1777912286629},
  // ===== 単語単体 (ビジネス) =====
  {id:"pre_414",word:"collaborate",meaning:"協力する、共同作業する",category:"ビジネス",level:2,phonetic:"/kəˈlæbəreɪt/",audioUS:"",audioUK:"",examples:["We need to collaborate on this project.","They collaborated with a design firm."],image:"",srs:{},history:[],createdAt:1777912346629},
  {id:"pre_415",word:"delegate",meaning:"権限を委任する、任せる",category:"ビジネス",level:3,phonetic:"/ˈdelɪɡeɪt/",audioUS:"",audioUK:"",examples:["You need to learn to delegate.","She delegated tasks to the team."],image:"",srs:{},history:[],createdAt:1777912406629},
  {id:"pre_416",word:"implement",meaning:"実施する、導入する",category:"ビジネス",level:2,phonetic:"/ˈɪmplɪment/",audioUS:"",audioUK:"",examples:["We need to implement this strategy ASAP.","The changes were implemented last quarter."],image:"",srs:{},history:[],createdAt:1777912466629},
  {id:"pre_417",word:"negotiate",meaning:"交渉する",category:"ビジネス",level:2,phonetic:"/nɪˈɡoʊʃieɪt/",audioUS:"",audioUK:"",examples:["We'll need to negotiate the contract.","She negotiated a higher salary."],image:"",srs:{},history:[],createdAt:1777912526629},
  {id:"pre_418",word:"prioritize",meaning:"優先順位をつける",category:"ビジネス",level:2,phonetic:"/praɪˈɒrɪtaɪz/",audioUS:"",audioUK:"",examples:["We need to prioritize this task.","Prioritize your health over everything."],image:"",srs:{},history:[],createdAt:1777912586629},
  {id:"pre_419",word:"streamline",meaning:"効率化する、合理化する",category:"ビジネス",level:3,phonetic:"/ˈstriːmlaɪn/",audioUS:"",audioUK:"",examples:["We need to streamline the process.","The new software streamlines workflows."],image:"",srs:{},history:[],createdAt:1777912646629},
  {id:"pre_420",word:"leverage",meaning:"〜を最大限に活用する",category:"ビジネス",level:3,phonetic:"/ˈlevərɪdʒ/",audioUS:"",audioUK:"",examples:["We can leverage our data here.","Leverage your strengths in the interview."],image:"",srs:{},history:[],createdAt:1777912706629},
  {id:"pre_421",word:"initiative",meaning:"主体的な取り組み、先導",category:"ビジネス",level:3,phonetic:"/ɪˈnɪʃətɪv/",audioUS:"",audioUK:"",examples:["She took the initiative on that project.","We're launching a new initiative next quarter."],image:"",srs:{},history:[],createdAt:1777912766629},
  {id:"pre_422",word:"accountability",meaning:"説明責任、責任感",category:"ビジネス",level:3,phonetic:"/əˌkaʊntəˈbɪlɪti/",audioUS:"",audioUK:"",examples:["There's a culture of accountability here.","Accountability is key to good leadership."],image:"",srs:{},history:[],createdAt:1777912826629},
  {id:"pre_423",word:"proactive",meaning:"積極的な、先回りした",category:"ビジネス",level:2,phonetic:"/proʊˈæktɪv/",audioUS:"",audioUK:"",examples:["Be proactive — don't wait to be asked.","She's always proactive about solving problems."],image:"",srs:{},history:[],createdAt:1777912886629},
  {id:"pre_424",word:"scalable",meaning:"拡張可能な、スケールできる",category:"ビジネス",level:3,phonetic:"/ˈskeɪləbl/",audioUS:"",audioUK:"",examples:["This model is not scalable.","We need a scalable solution."],image:"",srs:{},history:[],createdAt:1777912946629},
  {id:"pre_425",word:"benchmark",meaning:"基準、目標値、比較指標",category:"ビジネス",level:3,phonetic:"/ˈbentʃmɑːrk/",audioUS:"",audioUK:"",examples:["This sets a new benchmark for quality.","We're benchmarking against competitors."],image:"",srs:{},history:[],createdAt:1777913006629},
  {id:"pre_426",word:"deadline",meaning:"締め切り、期限",category:"ビジネス",level:1,phonetic:"/ˈdedlaɪn/",audioUS:"",audioUK:"",examples:["The deadline is Friday at 5 PM.","Don't miss the deadline."],image:"",srs:{},history:[],createdAt:1777913066629},
  {id:"pre_427",word:"incentive",meaning:"インセンティブ、やる気を引き出すもの",category:"ビジネス",level:3,phonetic:"/ɪnˈsentɪv/",audioUS:"",audioUK:"",examples:["What's the incentive for doing this?","They offered a bonus as an incentive."],image:"",srs:{},history:[],createdAt:1777913126629},
  {id:"pre_428",word:"sustainable",meaning:"持続可能な、長続きする",category:"ビジネス",level:2,phonetic:"/səˈsteɪnəbl/",audioUS:"",audioUK:"",examples:["We need a sustainable business model.","Is this growth sustainable?"],image:"",srs:{},history:[],createdAt:1777913186629},
  // ===== 単語単体 (旅行) =====
  {id:"pre_429",word:"itinerary",meaning:"旅程、行程表",category:"旅行",level:3,phonetic:"/aɪˈtɪnəreri/",audioUS:"",audioUK:"",examples:["Can you send me the itinerary?","Our itinerary includes three cities."],image:"",srs:{},history:[],createdAt:1777913246629},
  {id:"pre_430",word:"souvenir",meaning:"お土産、記念品",category:"旅行",level:2,phonetic:"/ˌsuːvəˈnɪər/",audioUS:"",audioUK:"",examples:["I bought a souvenir for my mom.","The souvenir shop was packed."],image:"",srs:{},history:[],createdAt:1777913306629},
  {id:"pre_431",word:"accommodation",meaning:"宿泊施設、住む場所",category:"旅行",level:2,phonetic:"/əˌkɒməˈdeɪʃən/",audioUS:"",audioUK:"",examples:["The accommodation was perfect.","Book accommodation in advance."],image:"",srs:{},history:[],createdAt:1777913366629},
  {id:"pre_432",word:"destination",meaning:"目的地、行き先",category:"旅行",level:1,phonetic:"/ˌdestɪˈneɪʃən/",audioUS:"",audioUK:"",examples:["Paris is her dream destination.","What's your final destination?"],image:"",srs:{},history:[],createdAt:1777913426629},
  {id:"pre_433",word:"departure",meaning:"出発、発車",category:"旅行",level:2,phonetic:"/dɪˈpɑːrtʃər/",audioUS:"",audioUK:"",examples:["Departure is at 7 AM.","Please check your departure gate."],image:"",srs:{},history:[],createdAt:1777913486629},
  {id:"pre_434",word:"arrival",meaning:"到着",category:"旅行",level:1,phonetic:"/əˈraɪvəl/",audioUS:"",audioUK:"",examples:["What time is your arrival?","Upon arrival, check in immediately."],image:"",srs:{},history:[],createdAt:1777913546629},
  {id:"pre_435",word:"currency",meaning:"通貨、お金",category:"旅行",level:2,phonetic:"/ˈkɜːrənsi/",audioUS:"",audioUK:"",examples:["What's the local currency here?","I need to exchange currency."],image:"",srs:{},history:[],createdAt:1777913606629},
  {id:"pre_436",word:"reservation",meaning:"予約",category:"旅行",level:1,phonetic:"/ˌrezərˈveɪʃən/",audioUS:"",audioUK:"",examples:["I have a reservation under Smith.","Make a reservation in advance."],image:"",srs:{},history:[],createdAt:1777913666629},
  {id:"pre_437",word:"customs",meaning:"税関、通関手続き",category:"旅行",level:2,phonetic:"/ˈkʌstəmz/",audioUS:"",audioUK:"",examples:["You have to declare items at customs.","The customs line was really long."],image:"",srs:{},history:[],createdAt:1777913726629},
  {id:"pre_438",word:"turbulence",meaning:"乱気流",category:"旅行",level:3,phonetic:"/ˈtɜːrbjuləns/",audioUS:"",audioUK:"",examples:["The flight hit some turbulence.","Fasten your seatbelt during turbulence."],image:"",srs:{},history:[],createdAt:1777913786629},
  {id:"pre_439",word:"layover",meaning:"乗り継ぎ待ち時間",category:"旅行",level:2,phonetic:"/ˈleɪoʊvər/",audioUS:"",audioUK:"",examples:["We have a 3-hour layover in Dubai.","I hate long layovers."],image:"",srs:{},history:[],createdAt:1777913846629},
  {id:"pre_440",word:"complimentary",meaning:"無料の、サービスの",category:"旅行",level:3,phonetic:"/ˌkɒmplɪˈmentəri/",audioUS:"",audioUK:"",examples:["Breakfast is complimentary.","The hotel offers complimentary Wi-Fi."],image:"",srs:{},history:[],createdAt:1777913906629},
  {id:"pre_441",word:"sightseeing",meaning:"観光",category:"旅行",level:1,phonetic:"/ˈsaɪtsiːɪŋ/",audioUS:"",audioUK:"",examples:["We spent the day sightseeing.","The sightseeing tour was amazing."],image:"",srs:{},history:[],createdAt:1777913966629},
  {id:"pre_442",word:"affordable",meaning:"手頃な値段の、リーズナブルな",category:"旅行",level:2,phonetic:"/əˈfɔːrdəbl/",audioUS:"",audioUK:"",examples:["The hotel was surprisingly affordable.","We're looking for affordable options."],image:"",srs:{},history:[],createdAt:1777914026629},
  {id:"pre_443",word:"backpacker",meaning:"バックパッカー、格安旅行者",category:"旅行",level:2,phonetic:"/ˈbækpækər/",audioUS:"",audioUK:"",examples:["The hostel was full of backpackers.","She traveled as a backpacker for a year."],image:"",srs:{},history:[],createdAt:1777914086629}
];
// ===== STORAGE =====
const S = {
  async get(k) { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : null; } catch { return null; } },
  async set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch(e) { console.error(e); } }
};

// ===== SRS =====
function nextSRS(srs = {}, q) {
  let { i = 1, e = 2.5, n = 0 } = srs;
  if (q === 0) return { i: 1, e: Math.max(1.3, e - 0.2), n: 0, due: Date.now() + 86400000 };
  const newI = n === 0 ? 1 : n === 1 ? 3 : Math.round(i * e);
  return { i: newI, e: Math.max(1.3, e + (q === 2 ? 0.1 : -0.1)), n: n + 1, due: Date.now() + newI * 86400000 };
}

// ===== DICT API =====
async function lookupWord(word) {
  try {
    const r = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(word)}`);
    if (!r.ok) return {};
    const [d] = await r.json();
    const ph = d.phonetics || [];
    return {
      phonetic: ph.find(p => p.text)?.text || d.phonetic || '',
      audioUS: ph.find(p => p.audio?.includes('-us'))?.audio || ph.find(p => p.audio)?.audio || '',
      audioUK: ph.find(p => p.audio?.includes('-uk'))?.audio || '',
      examples: d.meanings?.flatMap(m => m.definitions.map(df => df.example).filter(Boolean)).slice(0, 3) || [],
    };
  } catch { return {}; }
}

// ===== CLAUDE AI WORD GENERATION =====
async function generateWordInfo(word) {
  const res = await fetch("/api/claude", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "claude-sonnet-4-20250514",
      max_tokens: 1000,
      messages: [{ role: "user", content: `For the English word/phrase "${word}", respond ONLY with a JSON object (no markdown, no explanation):
{"meaning":"自然な日本語の意味","phonetic":"IPA発音記号","category":"スラング or 口語表現 or 熟語・イディオム or 日常会話 or ビジネス or 旅行 or その他","level":1から3の数字,"examples":["ネイティブが使う例文1","ネイティブが使う例文2"]}` }]
    })
  });
  const data = await res.json();
  const text = data.content?.find(b => b.type === 'text')?.text || '';
  return JSON.parse(text.replace(/```json|```/g, '').trim());
}

// ===== FETCH LATEST SLANG VIA WEB SEARCH =====
async function fetchLatestSlang(existingWords) {
  const existing = existingWords.slice(0, 60).map(w => w.word).join(', ');
  const res = await fetch("/api/claude", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "claude-sonnet-4-20250514",
      max_tokens: 2000,
      tools: [{ type: "web_search_20250305", name: "web_search" }],
      messages: [{ role: "user", content: `Search Reddit, social media, and current sources for the latest English slang and expressions actively used by native speakers in 2025. Find 8 expressions NOT in this list: ${existing}. Return ONLY a valid JSON array (no markdown, no explanation):
[{"word":"expression","meaning":"自然な日本語の意味","category":"スラング or 口語表現 or 熟語・イディオム or 日常会話 or ビジネス or 旅行 or その他","level":1から3,"examples":["example 1","example 2"]}]` }]
    })
  });
  const data = await res.json();
  const allText = (data.content || []).filter(b => b.type === 'text').map(b => b.text).join('');
  const match = allText.match(/\[[\s\S]*?\]/);
  if (!match) throw new Error('JSON not found');
  return JSON.parse(match[0]);
}

function playAudio(url, word, lang = 'en-US') {
  if (url) { const a = new Audio(url); a.play().catch(() => speak(word, lang)); } else speak(word, lang);
}
function speak(word, lang) {
  if (!window.speechSynthesis) return;
  const u = new SpeechSynthesisUtterance(word);
  u.lang = lang; u.rate = 0.9;
  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(u);
}

const CATS = ['日常会話', 'スラング', '口語表現', '熟語・イディオム', 'ビジネス', '旅行', 'その他'];
const C = { bg:'#06090F',card:'#0D1424',border:'#1C2A44',dim:'#263552',blue:'#4F8EF7',cyan:'#00D9FF',green:'#00E5A0',orange:'#FF8C42',red:'#FF4F6A',yellow:'#FFD166',text:'#E8EDF8',muted:'#5A6F9A' };
const CAT_COLOR = { '日常会話':'#4F8EF7','スラング':'#FF4F6A','口語表現':'#FF8C42','熟語・イディオム':'#9B5CF6','ビジネス':'#00E5A0','旅行':'#00D9FF','その他':'#5A6F9A' };
const gc = (cat) => CAT_COLOR[cat] || C.muted;
const inp = { background:C.card,border:`1px solid ${C.border}`,borderRadius:'12px',padding:'14px 16px',color:C.text,fontSize:'15px',width:'100%',outline:'none',fontFamily:'"DM Sans", sans-serif',boxSizing:'border-box' };
const lbl = { color:C.muted,fontSize:'12px',fontWeight:700,marginBottom:'8px',display:'block',textTransform:'uppercase',letterSpacing:'0.06em' };

// ===== MAIN =====
export default function App() {
  const [view, setView] = useState('home');
  const [words, setWords] = useState([]);
  const [streak, setStreak] = useState({ count:0, lastDate:null });
  const [loading, setLoading] = useState(true);
  const [editWord, setEditWord] = useState(null);
  const [showSlangModal, setShowSlangModal] = useState(false);

  useEffect(() => {
    (async () => {
      let [w, s] = await Promise.all([S.get('nv-words-v4'), S.get('nv-streak-v2')]);
      if (!w) {
        w = PRELOADED.map((p, i) => ({ id: `pre_${i}`, ...p, audioUS:'', audioUK:'', image:'', srs:{}, history:[], createdAt: Date.now() - (PRELOADED.length - i) * 60000 }));
        await S.set('nv-words-v4', w);
      }
      setWords(w);
      setStreak(s || { count:0, lastDate:null });
      setLoading(false);
    })();
  }, []);

  const saveWords = useCallback(async (w) => { setWords(w); await S.set('nv-words-v4', w); }, []);
  const saveStreak = useCallback(async (s) => { setStreak(s); await S.set('nv-streak-v2', s); }, []);
  const due = words.filter(w => !w.srs?.due || w.srs.due <= Date.now());

  if (loading) return (
    <div style={{ background:C.bg,minHeight:'100vh',display:'flex',alignItems:'center',justifyContent:'center',flexDirection:'column',gap:'16px' }}>
      <div style={{ fontFamily:'Inter,sans-serif',fontSize:'28px',fontWeight:800,background:'linear-gradient(135deg,#4F8EF7,#00D9FF)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent' }}>NativeVocab</div>
      <div style={{ color:C.muted,fontSize:'14px' }}>Loading...</div>
    </div>
  );

  return (
    <div style={{ background:C.bg,minHeight:'100vh',color:C.text,fontFamily:'"DM Sans",sans-serif',display:'flex',flexDirection:'column',maxWidth:'480px',margin:'0 auto' }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&display=swap" rel="stylesheet" />
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
      <div style={{ flex:1,paddingBottom:'80px',overflowY:'auto' }}>
        {view==='home'    && <HomeView words={words} streak={streak} due={due} onStudy={()=>setView('study')} onAdd={()=>{setEditWord(null);setView('add');}} />}
        {view==='library' && <LibraryView words={words} onEdit={w=>{setEditWord(w);setView('add');}} onDelete={id=>saveWords(words.filter(w=>w.id!==id))} onFetchSlang={()=>setShowSlangModal(true)} />}
        {view==='add'     && <AddWordView editWord={editWord} onSave={async w=>{await saveWords(editWord?words.map(x=>x.id===w.id?w:x):[w,...words]);setView('library');}} onCancel={()=>setView(editWord?'library':'home')} />}
        {view==='study'   && <StudyView words={words} due={due} onComplete={async(uw,ss)=>{await saveWords(uw);const today=new Date().toDateString();if(streak.lastDate!==today){const yest=new Date(Date.now()-86400000).toDateString();await saveStreak({count:streak.lastDate===yest?streak.count+1:1,lastDate:today});}setView('home');}} onBack={()=>setView('home')} />}
        {view==='stats'   && <StatsView words={words} streak={streak} />}
        {showSlangModal && <SlangModal words={words} onAdd={async newWords=>{const w=[...newWords,...words];await saveWords(w);setShowSlangModal(false);}} onClose={()=>setShowSlangModal(false)} />}
      </div>
      <BottomNav view={view} setView={setView} dueCount={due.length} />
    </div>
  );
}

// ===== HOME =====
function HomeView({ words, streak, due, onStudy, onAdd }) {
  const mastered = words.filter(w=>(w.srs?.n||0)>=5).length;
  return (
    <div style={{ padding:'28px 20px' }}>
      <div style={{ marginBottom:'28px',display:'flex',alignItems:'flex-start',justifyContent:'space-between' }}>
        <div>
          <div style={{ fontFamily:'Inter',fontSize:'30px',fontWeight:800,background:'linear-gradient(135deg,#4F8EF7,#00D9FF)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',letterSpacing:'-0.5px' }}>NativeVocab</div>
          <div style={{ color:C.muted,fontSize:'13px',marginTop:'2px' }}>ネイティブ英語マスター</div>
        </div>
        <button onClick={async()=>{
          if('caches' in window){const keys=await caches.keys();await Promise.all(keys.map(k=>caches.delete(k)));}
          window.location.reload();
        }} title="最新版に更新" style={{ background:C.card,border:`1px solid ${C.border}`,borderRadius:'10px',padding:'8px 10px',color:C.muted,cursor:'pointer',fontSize:'16px',marginTop:'4px' }}>🔄</button>
      </div>
      <div style={{ background:'linear-gradient(135deg,#1A0F3A88,#0D1424)',border:`1px solid ${C.dim}`,borderRadius:'22px',padding:'24px',marginBottom:'14px',display:'flex',alignItems:'center',gap:'16px',position:'relative',overflow:'hidden' }}>
        <div style={{ position:'absolute',right:'-10px',top:'-10px',fontSize:'80px',opacity:0.08 }}>🔥</div>
        <div style={{ fontSize:'52px' }}>🔥</div>
        <div><div style={{ fontFamily:'Inter',fontSize:'48px',fontWeight:800,color:C.orange,lineHeight:1 }}>{streak.count}</div><div style={{ color:C.muted,fontSize:'13px' }}>日連続学習中</div></div>
        <div style={{ marginLeft:'auto',textAlign:'right' }}><div style={{ fontFamily:'Inter',fontSize:'26px',fontWeight:800 }}>{words.length}</div><div style={{ color:C.muted,fontSize:'12px' }}>総単語数</div></div>
      </div>
      <div style={{ background:due.length>0?'linear-gradient(135deg,#0A1F3A,#0D1424)':C.card,border:`1px solid ${due.length>0?C.blue+'88':C.border}`,borderRadius:'22px',padding:'22px',marginBottom:'14px' }}>
        <div style={{ display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:'14px' }}>
          <div><div style={{ fontFamily:'Inter',fontSize:'18px',fontWeight:700 }}>今日の復習</div><div style={{ color:C.muted,fontSize:'13px',marginTop:'2px' }}>{due.length>0?`${due.length}語 待機中`:'全て完了！'}</div></div>
          {due.length>0&&<div style={{ background:C.blue,color:'#fff',fontFamily:'Inter',fontSize:'22px',fontWeight:800,width:'48px',height:'48px',borderRadius:'50%',display:'flex',alignItems:'center',justifyContent:'center' }}>{due.length}</div>}
        </div>
        <button onClick={onStudy} style={{ width:'100%',background:due.length>0?`linear-gradient(135deg,${C.blue},#2563EB)`:C.dim,border:'none',borderRadius:'14px',padding:'16px',color:'#fff',fontFamily:'Inter',fontSize:'16px',fontWeight:700,cursor:'pointer' }}>{due.length>0?'復習スタート →':'全単語を練習する →'}</button>
      </div>
      <div style={{ display:'grid',gridTemplateColumns:'1fr 1fr',gap:'12px',marginBottom:'22px' }}>
        {[['✅ 習得済み',mastered,C.green],['📖 学習中',words.length-mastered,C.cyan]].map(([l,v,col])=>(
          <div key={l} style={{ background:C.card,border:`1px solid ${C.border}`,borderRadius:'16px',padding:'20px',textAlign:'center' }}>
            <div style={{ fontSize:'13px',color:C.muted,marginBottom:'6px' }}>{l}</div>
            <div style={{ fontFamily:'Inter',fontSize:'32px',fontWeight:800,color:col }}>{v}</div>
          </div>
        ))}
      </div>
      <div style={{ color:C.muted,fontSize:'13px',fontWeight:700,textTransform:'uppercase',letterSpacing:'0.05em',marginBottom:'12px' }}>最近追加した単語</div>
      <div style={{ display:'flex',flexDirection:'column',gap:'8px' }}>
        {words.slice(0,4).map(w=>(
          <div key={w.id} style={{ background:C.card,border:`1px solid ${C.border}`,borderRadius:'14px',padding:'14px 16px',display:'flex',alignItems:'center',gap:'12px' }}>
            {w.image&&<img src={w.image} alt="" style={{ width:'40px',height:'40px',borderRadius:'8px',objectFit:'cover',flexShrink:0 }}/>}
            <div style={{ flex:1,minWidth:0 }}>
              <div style={{ fontFamily:'Inter',fontSize:'16px',fontWeight:700,whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis' }}>{w.word}</div>
              <div style={{ color:C.muted,fontSize:'13px',whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis' }}>{w.meaning}</div>
            </div>
            <span style={{ background:gc(w.category)+'28',color:gc(w.category),borderRadius:'8px',padding:'4px 8px',fontSize:'11px',fontWeight:700,flexShrink:0 }}>{w.category||'その他'}</span>
          </div>
        ))}
      </div>
      <button onClick={onAdd} style={{ position:'fixed',bottom:'96px',right:'20px',width:'58px',height:'58px',borderRadius:'50%',background:`linear-gradient(135deg,${C.blue},#2563EB)`,border:'none',color:'#fff',fontSize:'26px',cursor:'pointer',boxShadow:`0 8px 28px ${C.blue}55`,display:'flex',alignItems:'center',justifyContent:'center',zIndex:100 }}>＋</button>
    </div>
  );
}

// ===== ADD WORD =====
function AddWordView({ editWord, onSave, onCancel }) {
  const [word,setWord]=useState(editWord?.word||'');
  const [meaning,setMeaning]=useState(editWord?.meaning||'');
  const [phonetic,setPhonetic]=useState(editWord?.phonetic||'');
  const [audioUS,setAudioUS]=useState(editWord?.audioUS||'');
  const [audioUK,setAudioUK]=useState(editWord?.audioUK||'');
  const [examples,setExamples]=useState(editWord?.examples?.length?editWord.examples:['','','']);
  const [image,setImage]=useState(editWord?.image||'');
  const [category,setCategory]=useState(editWord?.category||'日常会話');
  const [level,setLevel]=useState(editWord?.level||1);
  const [fetching,setFetching]=useState(false);
  const [fetched,setFetched]=useState(false);
  const [aiGenerating,setAiGenerating]=useState(false);
  const [aiGenerated,setAiGenerated]=useState(false);
  const fileRef=useRef();

  const autoFetch=async()=>{
    if(!word.trim())return;
    setFetching(true);
    const d=await lookupWord(word.trim());
    if(d.phonetic)setPhonetic(d.phonetic);
    if(d.audioUS)setAudioUS(d.audioUS);
    if(d.audioUK)setAudioUK(d.audioUK);
    if(d.examples?.length)setExamples([...d.examples,'',''].slice(0,3));
    setFetched(true);setFetching(false);
  };

  const aiGenerate=async()=>{
    if(!word.trim())return;
    setAiGenerating(true);
    try {
      const d=await generateWordInfo(word.trim());
      if(d.meaning)setMeaning(d.meaning);
      if(d.phonetic)setPhonetic(d.phonetic);
      if(d.category)setCategory(d.category);
      if(d.level)setLevel(d.level);
      if(d.examples?.length)setExamples([...d.examples,''].slice(0,3));
      setAiGenerated(true);
    } catch(e){ alert('AI生成に失敗しました。もう一度お試しください。'); }
    setAiGenerating(false);
  };

  return (
    <div style={{ padding:'24px 20px' }}>
      <div style={{ display:'flex',alignItems:'center',gap:'12px',marginBottom:'28px' }}>
        <button onClick={onCancel} style={{ background:C.card,border:`1px solid ${C.border}`,borderRadius:'10px',padding:'8px 14px',color:C.muted,cursor:'pointer',fontSize:'18px' }}>←</button>
        <div style={{ fontFamily:'Inter',fontSize:'22px',fontWeight:800 }}>{editWord?'単語を編集':'単語を追加'}</div>
      </div>
      <div style={{ marginBottom:'20px' }}>
        <label style={lbl}>英単語 / フレーズ / スラング</label>
        <div style={{ display:'flex',gap:'10px' }}>
        <div style={{ display:'flex',gap:'8px',flexWrap:'wrap' }}>
          <input value={word} onChange={e=>setWord(e.target.value)} placeholder="例: hit the sack, vibe, GOAT..." style={{ ...inp,flex:1,minWidth:'140px' }} onKeyDown={e=>e.key==='Enter'&&autoFetch()} />
          <button onClick={autoFetch} disabled={fetching||aiGenerating||!word.trim()} style={{ background:fetched?C.green+'33':`linear-gradient(135deg,${C.blue},#2563EB)`,border:fetched?`1px solid ${C.green}`:'none',borderRadius:'12px',padding:'0 14px',color:fetched?C.green:'#fff',cursor:'pointer',fontSize:'12px',fontWeight:700,whiteSpace:'nowrap',opacity:!word.trim()?0.4:1,flexShrink:0,height:'48px' }}>
            {fetching?'...' : fetched?'✓辞書':'辞書取得'}
          </button>
          <button onClick={aiGenerate} disabled={fetching||aiGenerating||!word.trim()} style={{ background:aiGenerated?C.cyan+'22':`linear-gradient(135deg,#9B5CF6,#6D28D9)`,border:aiGenerated?`1px solid ${C.cyan}`:'none',borderRadius:'12px',padding:'0 14px',color:aiGenerated?C.cyan:'#fff',cursor:'pointer',fontSize:'12px',fontWeight:700,whiteSpace:'nowrap',opacity:!word.trim()?0.4:1,flexShrink:0,height:'48px' }}>
            {aiGenerating?'🤖 生成中...' : aiGenerated?'✓ AI完了':'🤖 AI生成'}
          </button>
        </div>
        </div>
      </div>
      {(phonetic||fetched)&&(
        <div style={{ background:C.card,border:`1px solid ${C.border}`,borderRadius:'12px',padding:'14px 16px',marginBottom:'20px',display:'flex',alignItems:'center',justifyContent:'space-between' }}>
          <span style={{ color:C.cyan,fontFamily:'monospace',fontSize:'17px' }}>{phonetic||'（発音記号なし）'}</span>
          <div style={{ display:'flex',gap:'8px' }}>
            <button onClick={()=>playAudio(audioUS,word,'en-US')} style={{ background:C.blue+'22',border:`1px solid ${C.blue}`,borderRadius:'8px',padding:'5px 12px',color:C.blue,cursor:'pointer',fontSize:'12px',fontWeight:700 }}>🔊 US</button>
            <button onClick={()=>playAudio(audioUK,word,'en-GB')} style={{ background:C.cyan+'18',border:`1px solid ${C.cyan}`,borderRadius:'8px',padding:'5px 12px',color:C.cyan,cursor:'pointer',fontSize:'12px',fontWeight:700 }}>🔊 UK</button>
          </div>
        </div>
      )}
      <div style={{ marginBottom:'20px' }}><label style={lbl}>意味（日本語）</label><input value={meaning} onChange={e=>setMeaning(e.target.value)} placeholder="例: 寝る、最高のやつ、雰囲気..." style={inp} /></div>
      <div style={{ marginBottom:'20px' }}>
        <label style={lbl}>カテゴリー</label>
        <div style={{ display:'flex',flexWrap:'wrap',gap:'8px' }}>
          {CATS.map(c=><button key={c} onClick={()=>setCategory(c)} style={{ background:category===c?gc(c):C.card,border:`1px solid ${category===c?gc(c):C.border}`,borderRadius:'20px',padding:'8px 14px',color:category===c?'#fff':C.muted,cursor:'pointer',fontSize:'13px',fontWeight:600 }}>{c}</button>)}
        </div>
      </div>
      <div style={{ marginBottom:'20px' }}>
        <label style={lbl}>例文</label>
        {examples.map((ex,i)=><div key={i} style={{ marginBottom:'8px' }}><textarea value={ex} onChange={e=>{const n=[...examples];n[i]=e.target.value;setExamples(n);}} placeholder={`例文 ${i+1}（任意）`} rows={2} style={{ ...inp,fontSize:'14px',resize:'none',lineHeight:'1.5' }}/></div>)}
      </div>
      <div style={{ marginBottom:'20px' }}>
        <label style={lbl}>画像（任意）</label>
        {image?(
          <div style={{ position:'relative',display:'inline-block' }}>
            <img src={image} alt="" style={{ width:'120px',height:'120px',borderRadius:'12px',objectFit:'cover',border:`2px solid ${C.border}` }}/>
            <button onClick={()=>setImage('')} style={{ position:'absolute',top:'-8px',right:'-8px',background:C.red,border:'none',borderRadius:'50%',width:'24px',height:'24px',color:'#fff',cursor:'pointer',fontSize:'14px',display:'flex',alignItems:'center',justifyContent:'center' }}>×</button>
          </div>
        ):(
          <button onClick={()=>fileRef.current?.click()} style={{ background:C.card,border:`1px dashed ${C.dim}`,borderRadius:'12px',padding:'20px',width:'100%',color:C.muted,cursor:'pointer',fontSize:'14px',display:'flex',flexDirection:'column',alignItems:'center',gap:'6px',boxSizing:'border-box' }}>
            <span style={{ fontSize:'28px' }}>🖼</span><span>画像をアップロード（任意）</span>
          </button>
        )}
        <input ref={fileRef} type="file" accept="image/*" onChange={e=>{const f=e.target.files?.[0];if(!f)return;const r=new FileReader();r.onload=ev=>setImage(ev.target.result);r.readAsDataURL(f);}} style={{ display:'none' }}/>
      </div>
      <div style={{ marginBottom:'28px' }}>
        <label style={lbl}>難易度レベル</label>
        <div style={{ display:'flex',gap:'8px' }}>
          {[1,2,3,4,5].map(l=><button key={l} onClick={()=>setLevel(l)} style={{ flex:1,background:level>=l?'#FFD16622':C.card,border:`1px solid ${level>=l?'#FFD166':C.border}`,borderRadius:'10px',padding:'12px 0',fontSize:'18px',cursor:'pointer',color:level>=l?'#FFD166':C.muted }}>{level>=l?'★':'☆'}</button>)}
        </div>
      </div>
      <button onClick={()=>{if(!word.trim()||!meaning.trim())return;onSave({id:editWord?.id||Date.now().toString(),word:word.trim(),meaning:meaning.trim(),phonetic,audioUS,audioUK,examples:examples.filter(e=>e.trim()),image,category,level,srs:editWord?.srs||{},history:editWord?.history||[],createdAt:editWord?.createdAt||Date.now()});}} disabled={!word.trim()||!meaning.trim()} style={{ width:'100%',background:!word.trim()||!meaning.trim()?C.dim:`linear-gradient(135deg,${C.blue},#2563EB)`,border:'none',borderRadius:'16px',padding:'18px',color:'#fff',fontFamily:'Inter',fontSize:'18px',fontWeight:700,cursor:!word.trim()||!meaning.trim()?'not-allowed':'pointer',opacity:!word.trim()||!meaning.trim()?0.5:1 }}>
        {editWord?'更新する':'単語を追加'}
      </button>
    </div>
  );
}

// ===== LIBRARY =====
function LibraryView({ words, onEdit, onDelete, onFetchSlang }) {
  const [search,setSearch]=useState('');
  const [filter,setFilter]=useState('すべて');
  const filtered=words.filter(w=>{
    const matchSearch=!search||w.word.toLowerCase().includes(search.toLowerCase())||w.meaning.includes(search);
    const matchFilter=filter==='すべて'||(filter==='単語'?!w.word.includes(' '):w.category===filter);
    return matchSearch&&matchFilter;
  });
  return (
    <div style={{ padding:'28px 20px' }}>
      <div style={{ display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:'20px' }}>
        <div style={{ fontFamily:'Inter',fontSize:'26px',fontWeight:800 }}>単語ライブラリ</div>
        <button onClick={onFetchSlang} style={{ background:`linear-gradient(135deg,#9B5CF6,#6D28D9)`,border:'none',borderRadius:'12px',padding:'10px 14px',color:'#fff',cursor:'pointer',fontSize:'12px',fontWeight:700,display:'flex',alignItems:'center',gap:'6px' }}>
          🌐 最新スラング取得
        </button>
      </div>
      <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="🔍 単語・意味で検索..." style={{ ...inp,marginBottom:'14px' }}/>
      <div style={{ display:'flex',gap:'8px',overflowX:'auto',paddingBottom:'8px',marginBottom:'16px',scrollbarWidth:'none' }}>
        {['すべて','単語',...CATS].map(c=><button key={c} onClick={()=>setFilter(c)} style={{ background:filter===c?(c==='単語'?C.blue:gc(c)):C.card,border:`1px solid ${filter===c?(c==='単語'?C.blue:gc(c)):C.border}`,borderRadius:'20px',padding:'8px 14px',color:filter===c?'#fff':C.muted,cursor:'pointer',fontSize:'13px',fontWeight:600,whiteSpace:'nowrap' }}>{c}</button>)}
      </div>
      <div style={{ color:C.muted,fontSize:'13px',marginBottom:'14px' }}>{filtered.length}語</div>
      {filtered.length===0?(
        <div style={{ textAlign:'center',padding:'60px 0',color:C.muted }}><div style={{ fontSize:'48px',marginBottom:'12px' }}>📭</div><div>単語がありません</div></div>
      ):(
        <div style={{ display:'flex',flexDirection:'column',gap:'10px' }}>
          {filtered.map(w=><WordCard key={w.id} word={w} onEdit={onEdit} onDelete={onDelete}/>)}
        </div>
      )}
    </div>
  );
}

function WordCard({ word, onEdit, onDelete }) {
  const [open,setOpen]=useState(false);
  return (
    <div style={{ background:C.card,border:`1px solid ${C.border}`,borderRadius:'16px',overflow:'hidden' }}>
      <div onClick={()=>setOpen(!open)} style={{ padding:'14px 16px',cursor:'pointer',display:'flex',alignItems:'center',gap:'12px' }}>
        {word.image&&<img src={word.image} alt="" style={{ width:'44px',height:'44px',borderRadius:'8px',objectFit:'cover',flexShrink:0 }}/>}
        <div style={{ flex:1,minWidth:0 }}>
          <div style={{ display:'flex',alignItems:'baseline',gap:'8px',flexWrap:'wrap' }}>
            <span style={{ fontFamily:'Inter',fontSize:'17px',fontWeight:700 }}>{word.word}</span>
            {word.phonetic&&<span style={{ color:C.cyan,fontSize:'12px',fontFamily:'monospace' }}>{word.phonetic}</span>}
          </div>
          <div style={{ color:C.muted,fontSize:'13px',marginTop:'2px',whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis' }}>{word.meaning}</div>
        </div>
        <div style={{ flexShrink:0 }}>
          <div style={{ background:gc(word.category)+'28',color:gc(word.category),borderRadius:'8px',padding:'3px 8px',fontSize:'11px',fontWeight:700,marginBottom:'4px',textAlign:'center' }}>{word.category||'その他'}</div>
          <div style={{ color:C.yellow,fontSize:'11px',textAlign:'center' }}>{'★'.repeat(word.level||1)}{'☆'.repeat(5-(word.level||1))}</div>
        </div>
      </div>
      {open&&(
        <div style={{ borderTop:`1px solid ${C.border}`,padding:'14px 16px' }}>
          <div style={{ display:'flex',gap:'8px',marginBottom:'12px',flexWrap:'wrap' }}>
            <button onClick={()=>playAudio(word.audioUS,word.word,'en-US')} style={{ background:C.blue+'22',border:`1px solid ${C.blue}`,borderRadius:'8px',padding:'6px 12px',color:C.blue,cursor:'pointer',fontSize:'12px',fontWeight:700 }}>🔊 US</button>
            <button onClick={()=>playAudio(word.audioUK,word.word,'en-GB')} style={{ background:C.cyan+'18',border:`1px solid ${C.cyan}`,borderRadius:'8px',padding:'6px 12px',color:C.cyan,cursor:'pointer',fontSize:'12px',fontWeight:700 }}>🔊 UK</button>
            <button onClick={()=>onEdit(word)} style={{ background:'transparent',border:`1px solid ${C.dim}`,borderRadius:'8px',padding:'6px 12px',color:C.muted,cursor:'pointer',fontSize:'12px',marginLeft:'auto' }}>編集</button>
            <button onClick={()=>{if(confirm(`「${word.word}」を削除しますか？`))onDelete(word.id);}} style={{ background:C.red+'18',border:`1px solid ${C.red}`,borderRadius:'8px',padding:'6px 12px',color:C.red,cursor:'pointer',fontSize:'12px' }}>削除</button>
          </div>
          {word.examples?.filter(e=>e).length>0&&<>
            <div style={{ color:C.muted,fontSize:'11px',fontWeight:700,textTransform:'uppercase',letterSpacing:'0.05em',marginBottom:'8px' }}>例文</div>
            {word.examples.filter(e=>e).map((ex,i)=><div key={i} style={{ background:'#08122088',borderLeft:`3px solid ${C.blue}`,padding:'10px 14px',borderRadius:'0 8px 8px 0',color:C.text,fontSize:'14px',lineHeight:'1.6',marginBottom:'6px' }}>{ex}</div>)}
          </>}
          <div style={{ display:'flex',gap:'16px',marginTop:'10px' }}>
            <span style={{ color:C.muted,fontSize:'12px' }}>復習回数: {word.srs?.n||0}回</span>
            <span style={{ color:C.muted,fontSize:'12px' }}>次回: {word.srs?.due?new Date(word.srs.due).toLocaleDateString('ja-JP'):'今すぐ'}</span>
          </div>
        </div>
      )}
    </div>
  );
}

// ===== STUDY =====
function StudyView({ words, due, onComplete, onBack }) {
  const [mode,setMode]=useState(null);
  const [queue,setQueue]=useState([]);
  const [cur,setCur]=useState(0);
  const [choices,setChoices]=useState([]);
  const [selected,setSelected]=useState(null);
  const [stats,setStats]=useState({correct:0,wrong:0});
  const [uw,setUw]=useState([...words]);
  const [done,setDone]=useState(false);
  const [currentPhonetic,setCurrentPhonetic]=useState('');
  const [filterCat,setFilterCat]=useState('すべて');
  const [filterLevel,setFilterLevel]=useState(0);
  const [explanation,setExplanation]=useState(null);
  const [loadingExp,setLoadingExp]=useState(false);
  const [pendingWords,setPendingWords]=useState(null);
  const [pendingStats,setPendingStats]=useState(null);

  const filteredWords=words.filter(w=>{
    const catOk=filterCat==='すべて'||(filterCat==='単語'?!w.word.includes(' '):w.category===filterCat);
    const lvlOk=filterLevel===0||w.level===filterLevel;
    return catOk&&lvlOk;
  });
  const filteredDue=due.filter(w=>{
    const catOk=filterCat==='すべて'||(filterCat==='単語'?!w.word.includes(' '):w.category===filterCat);
    const lvlOk=filterLevel===0||w.level===filterLevel;
    return catOk&&lvlOk;
  });

  useEffect(()=>{
    if(!queue.length||cur>=queue.length)return;
    const w=queue[cur];
    const others=words.filter(x=>x.id!==w.id&&x.meaning!==w.meaning);
    const sameCat=[...others.filter(x=>x.category===w.category)].sort(()=>Math.random()-0.5);
    const diffCat=[...others.filter(x=>x.category!==w.category)].sort(()=>Math.random()-0.5);
    const pool=[...sameCat,...diffCat];
    const wrong=pool.slice(0,3).map(x=>x.meaning);
    setChoices([...wrong,w.meaning].sort(()=>Math.random()-0.5));
    setSelected(null);setExplanation(null);setLoadingExp(false);
    if(w.phonetic){setCurrentPhonetic(w.phonetic);}
    else{setCurrentPhonetic('');lookupWord(w.word).then(d=>{if(d.phonetic)setCurrentPhonetic(d.phonetic);});}
  },[cur,queue]); // eslint-disable-line

  const start=m=>{
    const fw=filteredWords.length>=4?filteredWords:words;
    const fd=filteredDue;
    let q;
    if(m==='srs')q=fd.length>0?[...fd].sort(()=>Math.random()-0.5):[...fw].sort(()=>Math.random()-0.5).slice(0,10);
    else if(m==='random')q=[...fw].sort(()=>Math.random()-0.5).slice(0,20);
    else{q=fw.filter(w=>(w.history||[]).slice(-5).filter(h=>!h.correct).length>0);if(q.length===0)q=[...fw].sort(()=>Math.random()-0.5).slice(0,10);}
    setQueue(q);setCur(0);setSelected(null);setStats({correct:0,wrong:0});setUw([...words]);setDone(false);setMode(m);setExplanation(null);setPendingWords(null);setPendingStats(null);
  };

  const generateExplanation=async(w)=>{
    setLoadingExp(true);
    const exList=w.examples?.filter(e=>e)||[];
    const exText=exList.map((e,i)=>`${i+1}. ${e}`).join('\n');
    try{
      const res=await fetch('/api/claude',{
        method:'POST',headers:{'Content-Type':'application/json'},
        body:JSON.stringify({
          model:'claude-sonnet-4-20250514',
          max_tokens:900,
          messages:[{role:'user',content:`英語の「${w.word}」について、日本語で以下をJSON形式のみで返してください（コードブロック・説明不要）:\n{"etymology":"語源や由来（なぜこの単語/表現が生まれたか、2〜3文）","image":"頭の中でイメージしやすい記憶術や連想法（具体的な絵や場面が浮かぶ解説）","usage":"よく使われる場面やニュアンスの補足（1〜2文）","examples_ja":${JSON.stringify(exList.map(()=>'（日本語訳）'))}}

以下の例文を自然な日本語に翻訳してexamples_jaに入れてください：
${exText}`}]
        })
      });
      const data=await res.json();
      const text=data.content?.find(b=>b.type==='text')?.text||'';
      const match=text.match(/\{[\s\S]*\}/);
      if(!match)throw new Error('JSON not found in: '+text.slice(0,100));
      setExplanation(JSON.parse(match[0]));
    }catch(e){
      console.error('explanation error:',e);
      setExplanation({etymology:'解説の取得に失敗しました。',image:'',usage:'',examples_ja:[]});
    }
    setLoadingExp(false);
  };

  const handleSelect=(choice)=>{
    if(selected!==null)return;
    const w=queue[cur];
    const isCorrect=choice===w.meaning;
    const q=isCorrect?2:0;
    const srs=nextSRS(w.srs,q);
    const ok=q>0;
    const hist=[...(w.history||[]),{date:Date.now(),correct:ok}].slice(-20);
    const updatedWords=uw.map(x=>x.id===w.id?{...x,srs,history:hist}:x);
    const newStats={correct:stats.correct+(ok?1:0),wrong:stats.wrong+(ok?0:1)};
    setSelected(choice);
    setPendingWords(updatedWords);
    setPendingStats(newStats);
    generateExplanation(w);
  };

  const handleNext=()=>{
    if(!pendingWords)return;
    setUw(pendingWords);
    setStats(pendingStats);
    if(cur+1>=queue.length)setDone(true);
    else{setCur(cur+1);setExplanation(null);setLoadingExp(false);}
  };

  if(!mode)return(
    <div style={{ padding:'28px 20px' }}>
      <div style={{ display:'flex',alignItems:'center',gap:'12px',marginBottom:'24px' }}>
        <button onClick={onBack} style={{ background:C.card,border:`1px solid ${C.border}`,borderRadius:'10px',padding:'8px 14px',color:C.muted,cursor:'pointer',fontSize:'18px' }}>←</button>
        <div style={{ fontFamily:'Inter',fontSize:'22px',fontWeight:800 }}>学習モードを選択</div>
      </div>
      <div style={{ marginBottom:'14px' }}>
        <div style={{ color:C.muted,fontSize:'11px',fontWeight:700,textTransform:'uppercase',letterSpacing:'0.05em',marginBottom:'8px' }}>カテゴリー</div>
        <div style={{ display:'flex',gap:'8px',overflowX:'auto',paddingBottom:'6px',scrollbarWidth:'none' }}>
          {['すべて','単語',...CATS].map(c=><button key={c} onClick={()=>setFilterCat(c)} style={{ background:filterCat===c?(c==='単語'?C.blue:gc(c)):C.card,border:`1px solid ${filterCat===c?(c==='単語'?C.blue:gc(c)):C.border}`,borderRadius:'20px',padding:'7px 13px',color:filterCat===c?'#fff':C.muted,cursor:'pointer',fontSize:'12px',fontWeight:600,whiteSpace:'nowrap',flexShrink:0 }}>{c}</button>)}
        </div>
      </div>
      <div style={{ marginBottom:'20px' }}>
        <div style={{ color:C.muted,fontSize:'11px',fontWeight:700,textTransform:'uppercase',letterSpacing:'0.05em',marginBottom:'8px' }}>難易度</div>
        <div style={{ display:'flex',gap:'6px' }}>
          <button onClick={()=>setFilterLevel(0)} style={{ background:filterLevel===0?C.blue:C.card,border:`1px solid ${filterLevel===0?C.blue:C.border}`,borderRadius:'20px',padding:'7px 12px',color:filterLevel===0?'#fff':C.muted,cursor:'pointer',fontSize:'12px',fontWeight:600,whiteSpace:'nowrap' }}>すべて</button>
          {[1,2,3,4,5].map(l=><button key={l} onClick={()=>setFilterLevel(l)} style={{ flex:1,background:filterLevel===l?'#FFD16622':C.card,border:`1px solid ${filterLevel===l?'#FFD166':C.border}`,borderRadius:'20px',padding:'7px 4px',color:filterLevel===l?'#FFD166':C.muted,cursor:'pointer',fontSize:'12px',fontWeight:700 }}>{'★'.repeat(l)}</button>)}
        </div>
      </div>
      <div style={{ color:C.muted,fontSize:'12px',marginBottom:'16px',textAlign:'center' }}>対象: <span style={{ color:C.text,fontWeight:700 }}>{filteredWords.length}</span>語</div>
      <div style={{ display:'flex',flexDirection:'column',gap:'16px' }}>
        {[{m:'srs',emoji:'🧠',title:'SRS復習',desc:`今日の復習: ${filteredDue.length}語`,col:C.blue,badge:filteredDue.length},{m:'random',emoji:'🎲',title:'ランダム練習',desc:`${Math.min(filteredWords.length,20)}語をランダムで練習`,col:C.cyan},{m:'wrong',emoji:'💪',title:'苦手な単語',desc:'間違えた単語を集中練習',col:C.orange}].map(({m,emoji,title,desc,col,badge})=>(
          <div key={m} onClick={()=>start(m)} style={{ background:C.card,border:`1px solid ${col}33`,borderRadius:'20px',padding:'22px',cursor:'pointer',display:'flex',alignItems:'center',gap:'16px' }}>
            <div style={{ fontSize:'40px' }}>{emoji}</div>
            <div style={{ flex:1 }}><div style={{ fontFamily:'Inter',fontSize:'18px',fontWeight:800 }}>{title}</div><div style={{ color:C.muted,fontSize:'14px',marginTop:'4px' }}>{desc}</div></div>
            {badge>0&&<div style={{ background:col,color:'#fff',fontFamily:'Inter',fontSize:'18px',fontWeight:800,width:'40px',height:'40px',borderRadius:'50%',display:'flex',alignItems:'center',justifyContent:'center' }}>{badge}</div>}
            <span style={{ color:col,fontSize:'20px' }}>→</span>
          </div>
        ))}
      </div>
    </div>
  );

  if(done){
    const acc=Math.round((stats.correct/(stats.correct+stats.wrong))*100)||0;
    return(
      <div style={{ padding:'28px 20px',display:'flex',flexDirection:'column',alignItems:'center',paddingTop:'80px' }}>
        <div style={{ fontSize:'72px',marginBottom:'20px' }}>{acc>=70?'🎉':'💪'}</div>
        <div style={{ fontFamily:'Inter',fontSize:'30px',fontWeight:800,marginBottom:'8px' }}>完了！</div>
        <div style={{ color:C.muted,marginBottom:'36px' }}>お疲れ様でした</div>
        <div style={{ display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:'12px',width:'100%',marginBottom:'32px' }}>
          {[[stats.correct,'正解',C.green],[stats.wrong,'不正解',C.red],[`${acc}%`,'正答率',C.blue]].map(([v,l,col])=>(
            <div key={l} style={{ background:C.card,border:`1px solid ${C.border}`,borderRadius:'14px',padding:'16px',textAlign:'center' }}>
              <div style={{ fontFamily:'Inter',fontSize:'24px',fontWeight:800,color:col }}>{v}</div>
              <div style={{ color:C.muted,fontSize:'12px',marginTop:'4px' }}>{l}</div>
            </div>
          ))}
        </div>
        <button onClick={()=>onComplete(uw,stats)} style={{ width:'100%',background:`linear-gradient(135deg,${C.blue},#2563EB)`,border:'none',borderRadius:'16px',padding:'18px',color:'#fff',fontFamily:'Inter',fontSize:'18px',fontWeight:700,cursor:'pointer' }}>ホームに戻る</button>
      </div>
    );
  }

  const w=queue[cur];
  return(
    <div style={{ padding:'24px 20px' }}>
      <div style={{ display:'flex',alignItems:'center',gap:'12px',marginBottom:'20px' }}>
        <button onClick={onBack} style={{ background:C.card,border:`1px solid ${C.border}`,borderRadius:'10px',padding:'8px 14px',color:C.muted,cursor:'pointer',fontSize:'18px' }}>←</button>
        <div style={{ flex:1 }}>
          <div style={{ background:C.dim,borderRadius:'4px',height:'5px',overflow:'hidden' }}><div style={{ background:`linear-gradient(90deg,${C.blue},${C.cyan})`,height:'100%',width:`${(cur/queue.length)*100}%`,transition:'width 0.4s',borderRadius:'4px' }}/></div>
          <div style={{ color:C.muted,fontSize:'12px',marginTop:'4px',textAlign:'right' }}>{cur+1} / {queue.length}</div>
        </div>
        <div style={{ display:'flex',gap:'8px' }}>
          <span style={{ color:C.green,fontSize:'13px',fontWeight:700 }}>✓{stats.correct}</span>
          <span style={{ color:C.red,fontSize:'13px',fontWeight:700 }}>✗{stats.wrong}</span>
        </div>
      </div>
      <div style={{ background:'linear-gradient(160deg,#0D1424,#080D18)',border:`1px solid ${C.border}`,borderRadius:'24px',padding:'28px 24px',marginBottom:'14px',display:'flex',flexDirection:'column',alignItems:'center',position:'relative',overflow:'hidden' }}>
        <div style={{ position:'absolute',top:0,left:0,right:0,height:'3px',background:`linear-gradient(90deg,${gc(w.category)},transparent)` }}/>
        {w.image&&<img src={w.image} alt="" style={{ width:'80px',height:'80px',borderRadius:'14px',objectFit:'cover',marginBottom:'16px' }}/>}
        <div style={{ background:gc(w.category)+'22',color:gc(w.category),borderRadius:'20px',padding:'4px 12px',fontSize:'12px',fontWeight:700,marginBottom:'12px' }}>{w.category}</div>
        <div style={{ fontFamily:'Inter',fontSize:'36px',fontWeight:800,textAlign:'center',marginBottom:'6px',letterSpacing:'-0.5px' }}>{w.word}</div>
        <div style={{ color:C.cyan,fontFamily:'monospace',fontSize:'16px',marginBottom:'12px',minHeight:'22px',textAlign:'center' }}>
          {currentPhonetic?currentPhonetic:<span style={{ color:C.dim,fontSize:'13px' }}>…</span>}
        </div>
        <div style={{ display:'flex',gap:'8px' }}>
          <button onClick={()=>playAudio(w.audioUS,w.word,'en-US')} style={{ background:C.blue+'22',border:`1px solid ${C.blue}44`,borderRadius:'8px',padding:'5px 12px',color:C.blue,cursor:'pointer',fontSize:'12px',fontWeight:700 }}>🔊 US</button>
          <button onClick={()=>playAudio(w.audioUK,w.word,'en-GB')} style={{ background:C.cyan+'18',border:`1px solid ${C.cyan}44`,borderRadius:'8px',padding:'5px 12px',color:C.cyan,cursor:'pointer',fontSize:'12px',fontWeight:700 }}>🔊 UK</button>
        </div>
      </div>
      <div style={{ color:C.muted,fontSize:'11px',fontWeight:700,textTransform:'uppercase',letterSpacing:'0.06em',textAlign:'center',marginBottom:'10px' }}>意味を選んでください</div>
      <div style={{ display:'grid',gridTemplateColumns:'1fr 1fr',gap:'10px' }}>
        {choices.map((choice,i)=>{
          let bg=C.card,border=C.border,col=C.text;
          if(selected!==null){
            if(choice===w.meaning){bg=C.green+'22';border=C.green;col=C.green;}
            else if(choice===selected){bg=C.red+'22';border=C.red;col=C.red;}
            else{bg=C.card;border=C.dim;col=C.muted;}
          }
          return(
            <button key={i} onClick={()=>handleSelect(choice)} disabled={selected!==null} style={{ background:bg,border:`2px solid ${border}`,borderRadius:'14px',padding:'14px 10px',color:col,cursor:selected!==null?'default':'pointer',fontFamily:'"DM Sans",sans-serif',fontSize:'13px',fontWeight:600,lineHeight:'1.5',textAlign:'center',transition:'all 0.25s',minHeight:'64px' }}>
              {choice}
            </button>
          );
        })}
      </div>
      {selected!==null&&(
        <div style={{ marginTop:'12px' }}>
          <div style={{ padding:'14px 16px',borderRadius:'14px',background:selected===w.meaning?C.green+'18':C.red+'18',border:`1px solid ${selected===w.meaning?C.green:C.red}`,marginBottom:'10px' }}>
            <div style={{ color:selected===w.meaning?C.green:C.red,fontWeight:700,fontSize:'15px',marginBottom:'8px',textAlign:'center' }}>{selected===w.meaning?'✓ 正解！':'✗ 不正解'}</div>
            {selected!==w.meaning&&<div style={{ color:C.text,fontSize:'13px',marginBottom:'8px',textAlign:'center' }}>正解: <span style={{ color:C.green,fontWeight:700 }}>{w.meaning}</span></div>}
            {w.examples?.filter(e=>e).length>0&&(
              <div style={{ marginTop:'6px' }}>
                <div style={{ color:C.muted,fontSize:'11px',fontWeight:700,textTransform:'uppercase',letterSpacing:'0.05em',marginBottom:'6px' }}>例文</div>
                {w.examples.filter(e=>e).map((ex,i)=>(
                  <div key={i} style={{ background:'#08122088',borderLeft:`3px solid ${C.blue}`,padding:'8px 12px',borderRadius:'0 8px 8px 0',marginBottom:'6px' }}>
                    <div style={{ color:C.text,fontSize:'13px',lineHeight:'1.6',fontStyle:'italic' }}>{ex}</div>
                    {explanation?.examples_ja?.[i]&&<div style={{ color:C.cyan,fontSize:'12px',marginTop:'3px' }}>→ {explanation.examples_ja[i]}</div>}
                  </div>
                ))}
              </div>
            )}
          </div>
          {loadingExp&&(
            <div style={{ padding:'14px',background:C.card,border:`1px solid ${C.border}`,borderRadius:'14px',textAlign:'center',color:C.muted,fontSize:'13px',marginBottom:'10px',display:'flex',alignItems:'center',justifyContent:'center',gap:'8px' }}>
              <span style={{ display:'inline-block',width:'14px',height:'14px',border:`2px solid ${C.muted}`,borderTopColor:C.cyan,borderRadius:'50%',animation:'spin 0.8s linear infinite' }}/>
              解説を生成中...
            </div>
          )}
          {explanation&&(explanation.etymology||explanation.image||explanation.usage)&&(
            <div style={{ padding:'16px',background:'linear-gradient(135deg,#080F1E,#0A1225)',border:`1px solid ${C.dim}`,borderRadius:'16px',marginBottom:'10px' }}>
              <div style={{ color:C.yellow,fontSize:'12px',fontWeight:700,marginBottom:'12px',display:'flex',alignItems:'center',gap:'6px' }}>
                <span>📚</span><span>語源・イメージ解説</span>
              </div>
              {explanation.etymology&&(
                <div style={{ marginBottom:'10px' }}>
                  <div style={{ color:C.cyan,fontSize:'11px',fontWeight:700,marginBottom:'4px' }}>📖 語源・由来</div>
                  <div style={{ color:C.text,fontSize:'13px',lineHeight:'1.7' }}>{explanation.etymology}</div>
                </div>
              )}
              {explanation.image&&(
                <div style={{ marginBottom:'10px' }}>
                  <div style={{ color:C.green,fontSize:'11px',fontWeight:700,marginBottom:'4px' }}>🧠 頭でイメージ</div>
                  <div style={{ color:C.text,fontSize:'13px',lineHeight:'1.7' }}>{explanation.image}</div>
                </div>
              )}
              {explanation.usage&&(
                <div>
                  <div style={{ color:C.orange,fontSize:'11px',fontWeight:700,marginBottom:'4px' }}>💬 使い方・ニュアンス</div>
                  <div style={{ color:C.text,fontSize:'13px',lineHeight:'1.7' }}>{explanation.usage}</div>
                </div>
              )}
            </div>
          )}
          <button onClick={handleNext} style={{ width:'100%',background:`linear-gradient(135deg,${C.blue},#2563EB)`,border:'none',borderRadius:'14px',padding:'16px',color:'#fff',fontFamily:'Inter',fontSize:'16px',fontWeight:700,cursor:'pointer',marginBottom:'4px' }}>
            {cur+1>=queue.length?'結果を見る →':'次へ →'}
          </button>
        </div>
      )}
    </div>
  );
}


// ===== STATS =====
function StatsView({ words, streak }) {
  const total=words.length,mastered=words.filter(w=>(w.srs?.n||0)>=5).length;
  const allHist=words.flatMap(w=>w.history||[]);
  const recent=allHist.slice(-50);
  const acc=recent.length>0?Math.round(recent.filter(h=>h.correct).length/recent.length*100):0;
  const catCounts=CATS.reduce((a,c)=>({...a,[c]:words.filter(w=>w.category===c).length}),{});
  const days=Array.from({length:7},(_,i)=>{const d=new Date(Date.now()-(6-i)*86400000);return{label:`${d.getMonth()+1}/${d.getDate()}`,date:d.toDateString()};});
  const daily=days.map(d=>({...d,count:allHist.filter(h=>new Date(h.date).toDateString()===d.date).length}));
  const maxC=Math.max(...daily.map(d=>d.count),1);
  return(
    <div style={{ padding:'28px 20px' }}>
      <div style={{ fontFamily:'Inter',fontSize:'26px',fontWeight:800,marginBottom:'24px' }}>学習統計</div>
      <div style={{ background:'linear-gradient(135deg,#1A0F3A88,#0D1424)',border:`1px solid ${C.dim}`,borderRadius:'22px',padding:'24px',marginBottom:'16px',display:'flex',alignItems:'center',gap:'16px' }}>
        <div style={{ fontSize:'48px' }}>🔥</div>
        <div><div style={{ fontFamily:'Inter',fontSize:'42px',fontWeight:800,color:C.orange,lineHeight:1 }}>{streak.count}日</div><div style={{ color:C.muted,fontSize:'13px' }}>連続学習ストリーク</div></div>
      </div>
      <div style={{ display:'grid',gridTemplateColumns:'1fr 1fr',gap:'12px',marginBottom:'16px' }}>
        {[['総単語数',total,C.blue],['正答率',`${acc}%`,C.green],['習得済み',mastered,C.cyan],['学習中',total-mastered,C.orange]].map(([l,v,col])=>(
          <div key={l} style={{ background:C.card,border:`1px solid ${C.border}`,borderRadius:'16px',padding:'20px' }}>
            <div style={{ color:C.muted,fontSize:'11px',fontWeight:700,textTransform:'uppercase',letterSpacing:'0.06em',marginBottom:'6px' }}>{l}</div>
            <div style={{ fontFamily:'Inter',fontSize:'30px',fontWeight:800,color:col }}>{v}</div>
          </div>
        ))}
      </div>
      <div style={{ background:C.card,border:`1px solid ${C.border}`,borderRadius:'20px',padding:'24px',marginBottom:'16px' }}>
        <div style={{ fontFamily:'Inter',fontSize:'16px',fontWeight:700,marginBottom:'20px' }}>7日間の学習回数</div>
        <div style={{ display:'flex',alignItems:'flex-end',gap:'6px',height:'100px' }}>
          {daily.map((d,i)=>(
            <div key={i} style={{ flex:1,display:'flex',flexDirection:'column',alignItems:'center',gap:'5px',height:'100%',justifyContent:'flex-end' }}>
              {d.count>0&&<div style={{ color:C.muted,fontSize:'10px',fontWeight:700 }}>{d.count}</div>}
              <div style={{ width:'100%',background:d.count>0?`linear-gradient(180deg,${C.blue},${C.cyan}55)`:C.dim,borderRadius:'5px 5px 0 0',height:`${Math.max((d.count/maxC)*65+5,d.count>0?10:4)}px` }}/>
              <div style={{ color:C.muted,fontSize:'10px' }}>{d.label}</div>
            </div>
          ))}
        </div>
      </div>
      <div style={{ background:C.card,border:`1px solid ${C.border}`,borderRadius:'20px',padding:'24px' }}>
        <div style={{ fontFamily:'Inter',fontSize:'16px',fontWeight:700,marginBottom:'16px' }}>カテゴリー内訳</div>
        {CATS.filter(c=>catCounts[c]>0).map(c=>(
          <div key={c} style={{ marginBottom:'12px' }}>
            <div style={{ display:'flex',justifyContent:'space-between',marginBottom:'5px' }}>
              <span style={{ color:C.text,fontSize:'14px' }}>{c}</span>
              <span style={{ color:C.muted,fontSize:'13px' }}>{catCounts[c]}語</span>
            </div>
            <div style={{ background:C.dim,borderRadius:'4px',height:'6px',overflow:'hidden' }}><div style={{ background:gc(c),height:'100%',width:`${(catCounts[c]/total)*100}%`,borderRadius:'4px' }}/></div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ===== SLANG MODAL =====
function SlangModal({ words, onAdd, onClose }) {
  const [loading,setLoading]=useState(true);
  const [candidates,setCandidates]=useState([]);
  const [selected,setSelected]=useState({});
  const [error,setError]=useState('');

  useEffect(()=>{
    (async()=>{
      try {
        const results=await fetchLatestSlang(words);
        setCandidates(results);
        const sel={};
        results.forEach((_,i)=>sel[i]=true);
        setSelected(sel);
      } catch(e){ setError('取得に失敗しました。もう一度お試しください。'); }
      setLoading(false);
    })();
  },[]);

  const toggle=i=>setSelected(s=>({...s,[i]:!s[i]}));
  const selectedCount=Object.values(selected).filter(Boolean).length;

  const handleAdd=()=>{
    const toAdd=candidates
      .filter((_,i)=>selected[i])
      .map((c,i)=>({
        id:`slang_${Date.now()}_${i}`,
        word:c.word, meaning:c.meaning, category:c.category||'スラング',
        level:c.level||2, phonetic:'', audioUS:'', audioUK:'',
        examples:c.examples||[], image:'', srs:{}, history:[],
        createdAt:Date.now()
      }));
    onAdd(toAdd);
  };

  return (
    <div style={{ position:'fixed',inset:0,background:'#000000CC',zIndex:300,display:'flex',alignItems:'flex-end' }}>
      <div style={{ background:C.bg,border:`1px solid ${C.border}`,borderRadius:'24px 24px 0 0',width:'100%',maxWidth:'480px',margin:'0 auto',padding:'24px 20px',maxHeight:'85vh',display:'flex',flexDirection:'column' }}>
        <div style={{ display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:'20px' }}>
          <div>
            <div style={{ fontFamily:'Inter',fontSize:'20px',fontWeight:800 }}>🌐 最新スラング取得</div>
            <div style={{ color:C.muted,fontSize:'13px',marginTop:'2px' }}>Webを検索して最新の表現を取得しています</div>
          </div>
          <button onClick={onClose} style={{ background:C.card,border:`1px solid ${C.border}`,borderRadius:'10px',padding:'8px 12px',color:C.muted,cursor:'pointer',fontSize:'16px' }}>✕</button>
        </div>

        {loading && (
          <div style={{ flex:1,display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',gap:'16px',padding:'40px 0' }}>
            <div style={{ fontSize:'48px' }}>🔍</div>
            <div style={{ color:C.muted,fontSize:'14px',textAlign:'center' }}>Reddit・SNS・最新ニュースを検索中...</div>
            <div style={{ color:C.muted,fontSize:'12px' }}>10〜20秒かかる場合があります</div>
          </div>
        )}

        {error && (
          <div style={{ flex:1,display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',gap:'12px' }}>
            <div style={{ fontSize:'48px' }}>😵</div>
            <div style={{ color:C.red,fontSize:'14px' }}>{error}</div>
            <button onClick={onClose} style={{ background:C.blue,border:'none',borderRadius:'12px',padding:'12px 24px',color:'#fff',cursor:'pointer',fontWeight:700 }}>閉じる</button>
          </div>
        )}

        {!loading && !error && candidates.length > 0 && (
          <>
            <div style={{ color:C.muted,fontSize:'12px',marginBottom:'12px' }}>{candidates.length}件見つかりました。追加するものを選んでください。</div>
            <div style={{ flex:1,overflowY:'auto',display:'flex',flexDirection:'column',gap:'10px',marginBottom:'16px' }}>
              {candidates.map((c,i)=>(
                <div key={i} onClick={()=>toggle(i)} style={{ background:selected[i]?C.card+'EE':C.card+'55',border:`1px solid ${selected[i]?gc(c.category||'スラング'):C.border}`,borderRadius:'14px',padding:'14px 16px',cursor:'pointer',transition:'all 0.2s' }}>
                  <div style={{ display:'flex',alignItems:'center',gap:'10px' }}>
                    <div style={{ width:'22px',height:'22px',borderRadius:'6px',background:selected[i]?C.blue:C.dim,display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0 }}>
                      {selected[i]&&<span style={{ color:'#fff',fontSize:'14px' }}>✓</span>}
                    </div>
                    <div style={{ flex:1,minWidth:0 }}>
                      <div style={{ display:'flex',alignItems:'center',gap:'8px',flexWrap:'wrap' }}>
                        <span style={{ fontFamily:'Inter',fontSize:'16px',fontWeight:700 }}>{c.word}</span>
                        <span style={{ background:gc(c.category||'スラング')+'28',color:gc(c.category||'スラング'),borderRadius:'8px',padding:'2px 8px',fontSize:'11px',fontWeight:700 }}>{c.category||'スラング'}</span>
                      </div>
                      <div style={{ color:C.muted,fontSize:'13px',marginTop:'3px' }}>{c.meaning}</div>
                      {c.examples?.[0]&&<div style={{ color:C.muted,fontSize:'12px',marginTop:'4px',fontStyle:'italic' }}>"{c.examples[0]}"</div>}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <button onClick={handleAdd} disabled={selectedCount===0} style={{ width:'100%',background:selectedCount>0?`linear-gradient(135deg,${C.blue},#2563EB)`:C.dim,border:'none',borderRadius:'16px',padding:'18px',color:'#fff',fontFamily:'Inter',fontSize:'17px',fontWeight:700,cursor:selectedCount>0?'pointer':'not-allowed',opacity:selectedCount>0?1:0.5 }}>
              {selectedCount}語を追加する
            </button>
          </>
        )}
      </div>
    </div>
  );
}

// ===== BOTTOM NAV =====
function BottomNav({ view, setView, dueCount }) {
  const tabs=[{id:'home',icon:'🏠',label:'ホーム'},{id:'library',icon:'📚',label:'ライブラリ'},{id:'study',icon:'🎯',label:'学習',badge:dueCount},{id:'stats',icon:'📊',label:'統計'}];
  return(
    <div style={{ position:'fixed',bottom:0,left:'50%',transform:'translateX(-50%)',width:'100%',maxWidth:'480px',background:'#090C16EE',borderTop:`1px solid ${C.border}`,display:'flex',zIndex:200,backdropFilter:'blur(20px)' }}>
      {tabs.map(t=>(
        <button key={t.id} onClick={()=>setView(t.id)} style={{ flex:1,background:'transparent',border:'none',padding:'12px 8px 16px',cursor:'pointer',display:'flex',flexDirection:'column',alignItems:'center',gap:'3px',position:'relative' }}>
          <div style={{ fontSize:'22px',filter:view===t.id?'none':'grayscale(100%) opacity(0.4)' }}>{t.icon}</div>
          <div style={{ color:view===t.id?C.blue:C.muted,fontSize:'10px',fontWeight:view===t.id?700:400 }}>{t.label}</div>
          {t.badge>0&&<div style={{ position:'absolute',top:'7px',right:'50%',transform:'translateX(12px)',background:C.red,color:'#fff',borderRadius:'50%',width:'17px',height:'17px',fontSize:'10px',fontWeight:800,display:'flex',alignItems:'center',justifyContent:'center',fontFamily:'Inter' }}>{t.badge>9?'9+':t.badge}</div>}
          {view===t.id&&<div style={{ position:'absolute',bottom:0,left:'20%',right:'20%',height:'2px',background:C.blue,borderRadius:'2px' }}/>}
        </button>
      ))}
    </div>
  );
}
