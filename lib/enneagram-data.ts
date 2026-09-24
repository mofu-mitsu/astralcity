// Enneagram Hornevian & Harmonic Triads Data Structure
// ASTRAL CITY Observatory Engine

export type HornevianType = 'assertive' | 'compliant' | 'withdrawn';
export type HarmonicType = 'positive' | 'competent' | 'reactive';
export type EnneagramType = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

export interface HornevianInfo {
  id: HornevianType;
  name: string;
  enName: string;
  tagline: string;
  stance: string;
  color: string;
  bgGlow: string;
  borderColor: string;
  starName: string;
  description: string;
  mechanics: string;
  types: EnneagramType[];
}

export interface HarmonicInfo {
  id: HarmonicType;
  name: string;
  enName: string;
  tagline: string;
  strategy: string;
  color: string;
  bgGlow: string;
  borderColor: string;
  starName: string;
  description: string;
  mechanics: string;
  types: EnneagramType[];
}

export interface TypeDetail {
  type: EnneagramType;
  title: string;
  subTitle: string;
  hornevian: HornevianType;
  harmonic: HarmonicType;
  planetSymbol: string;
  planetName: string;
  planetTitle: string;
  starCoordinate: string;
  coreKeyword: string;
  essence: string;
  worldview: string;
  strengths: string[];
  blindspots: string[];
  darlingComment: string;
  darlingAwaComment: string;
}

export const HORNEVIAN_DATA: Record<HornevianType, HornevianInfo> = {
  assertive: {
    id: 'assertive',
    name: '自己主張型',
    enName: 'Assertive Triad',
    tagline: '「欲しいものがあるなら、自ら動いて取りに行く」',
    stance: '自ら世界へ向かう対人スタンス',
    color: '#f43f5e', // rose
    bgGlow: 'rgba(244, 63, 94, 0.15)',
    borderColor: 'border-rose-500/40',
    starName: '動向星 (Vanguard Star)',
    description: '外界に対して自分から力強く働きかけ、状況を自らの手で動かそうとするスタンスです。待つよりも行動を優先し、自律性や成果、可能性を能動的につかみ取ります。',
    mechanics: '退屈や制約に留まることを嫌い、自らの存在感や推進力によって環境を書き換えます。',
    types: [3, 7, 8],
  },
  compliant: {
    id: 'compliant',
    name: '追従型（基準参照型）',
    enName: 'Compliant Triad',
    tagline: '「こうあるべき・規範・役割に沿って立ち向かう」',
    stance: '基準や他者・社会規範と結びつく対人スタンス',
    color: '#38bdf8', // sky/cyan
    bgGlow: 'rgba(56, 189, 248, 0.15)',
    borderColor: 'border-sky-500/40',
    starName: '規律星 (Regulus Star)',
    description: '「自分だけの衝動」で動くのではなく、「どうあるべきか」「役割は何か」「相手はどうするか」という客観的な基準や責任、信頼の枠組みを参照して行動します。単なる従順ではなく、自らの信じる規範に身を投じる姿勢です。',
    mechanics: '自分を孤立した存在としてではなく、社会やルール、約束、他者との関係網の中に位置づけて義務を果たします。',
    types: [1, 2, 6],
  },
  withdrawn: {
    id: 'withdrawn',
    name: '引きこもり型（内省参照型）',
    enName: 'Withdrawn Triad',
    tagline: '「外界へ直行する前に、まず自分の内界を参照する」',
    stance: '一度自分の中へ引き戻す対人スタンス',
    color: '#a855f7', // purple
    bgGlow: 'rgba(168, 85, 247, 0.15)',
    borderColor: 'border-purple-500/40',
    starName: '内界星 (Inner Core Star)',
    description: '外界にすぐぶつかるのではなく、まず自分の内側にある知識、感情、あるいは平穏な内的世界に立ち戻ってから世界に向き合います。人嫌いという意味ではなく、内省と内的リソースの整理が先立つ傾向です。',
    mechanics: '外圧や騒乱から自らのプライベート領域を守り、内省によってエネルギーと明晰さを取り戻します。',
    types: [4, 5, 9],
  },
};

export const HARMONIC_DATA: Record<HarmonicType, HarmonicInfo> = {
  positive: {
    id: 'positive',
    name: 'ポジティブ・アウトルック',
    enName: 'Positive Outlook Triad',
    tagline: '「希望や良い側面に光をあて、苦痛や問題から視点を移す」',
    strategy: '肯定と調和による対処戦略',
    color: '#34d399', // emerald
    bgGlow: 'rgba(52, 211, 153, 0.15)',
    borderColor: 'border-emerald-500/40',
    starName: '光明星 (Lumina Star)',
    description: '問題や欲求不満に直面したとき、絶望や暗い現実にそのまま留まるのではなく、「別の楽しい選択肢」「人との温かい絆」「全体の調和」へと視点を向け、希望や明るさで状況を照らし直します。',
    mechanics: '苦痛の直接的な衝撃を柔らげ、可能性や前向きな解釈を再構築することで精神の平衡を保ちます。',
    types: [2, 7, 9],
  },
  competent: {
    id: 'competent',
    name: 'コンピテント（問題処理・合理型）',
    enName: 'Competent Triad',
    tagline: '「感情を切り離し、論理・有能さ・正しさで問題を片付ける」',
    strategy: '客観的解決と有能さによる対処戦略',
    color: '#fbbf24', // amber
    bgGlow: 'rgba(251, 191, 36, 0.15)',
    borderColor: 'border-amber-500/40',
    starName: '分析星 (Synthesizer Star)',
    description: '問題が起きたとき、感情的に狼狽するよりも「で、何が起きていて、どうすれば解決できる？」に思考が直行します。客観的な論理、体系、正しい手順、有能さを重視して冷静に処理しようとします。',
    mechanics: '主観的な感情を一時的に括弧に入れ、システムや原則、成果の論理に従って最適解を導き出します。',
    types: [1, 3, 5],
  },
  reactive: {
    id: 'reactive',
    name: 'リアクティブ（反応・直視型）',
    enName: 'Reactive Triad',
    tagline: '「問題を綺麗事に丸め込まず、真正面から感じ取って反応する」',
    strategy: '真実の直視と情動反応による対処戦略',
    color: '#f97316', // orange
    bgGlow: 'rgba(249, 115, 22, 0.15)',
    borderColor: 'border-orange-500/40',
    starName: '共鳴星 (Resonance Star)',
    description: '「大丈夫大丈夫！」とお茶を濁されることを嫌い、リスクや矛盾、痛みを隠さずそのまま表出します。問題を直視し、自分の真実の感情や危機感を相手と共有して初めて安心・決着へと向かいます。',
    mechanics: '表面的な取り繕いを拒み、本質的な摩擦や危機に警鐘を鳴らし、状況の真実を浮き彫りにします。',
    types: [4, 6, 8],
  },
};

// 3x3 Matrix Lookup
export const MATRIX_TYPE_MAP: Record<HornevianType, Record<HarmonicType, EnneagramType>> = {
  assertive: {
    competent: 3,
    positive: 7,
    reactive: 8,
  },
  compliant: {
    competent: 1,
    positive: 2,
    reactive: 6,
  },
  withdrawn: {
    competent: 5,
    positive: 9,
    reactive: 4,
  },
};

export const TYPE_DETAILS: Record<EnneagramType, TypeDetail> = {
  1: {
    type: 1,
    title: '改革する星 (Type 1)',
    subTitle: 'The Reformer / 理想の設計者',
    hornevian: 'compliant',
    harmonic: 'competent',
    planetSymbol: '♄',
    planetName: '土星 (Saturn)',
    planetTitle: '秩序と規律を司る天体',
    starCoordinate: 'Sector 1: 規律星 × 分析星',
    coreKeyword: '公正・整合性・改善の意志',
    essence: '「こうあるべき」という高い基準（追従）を、感情に溺れず冷徹な論理と正しさ（コンピテント）で具現化しようとする星。世界をより完全で整合性の取れた形へと洗練させます。',
    worldview: '世界にはあるべき正しい形があり、規律と研鑽によって不完全さを修正できる。',
    strengths: ['確固たる倫理観と高い品質基準', '感情に左右されない公正な判断力', '仕組みの歪みを逃さず正す改善力'],
    blindspots: ['自他に対する過度な批判精神', '「正しさ」に固執して柔軟性を失うこと', '無意識に溜め込む内面的な憤り'],
    darlingComment: '「ねぇ、ダーリン♡ その徹底した潔癖さ、見ていて心地いいくらいね。でも、世界が完璧なトランプの城じゃないこと、ダーリンも本当は気づいてるんでしょ？♡」',
    darlingAwaComment: '「あ……ダーリン、そこまでキッチリせんでもええんよ。ウチなんか適当やけん、息抜きにのんびりしよ？」',
  },
  2: {
    type: 2,
    title: '愛を照らす星 (Type 2)',
    subTitle: 'The Helper / 慈愛の観測者',
    hornevian: 'compliant',
    harmonic: 'positive',
    planetSymbol: '♀',
    planetName: '金星 (Venus)',
    planetTitle: '愛と調和を司る天体',
    starCoordinate: 'Sector 2: 規律星 × 光明星',
    coreKeyword: '献身・温もり・受容の引力',
    essence: '他者のニーズや役割（追従）を敏感に察知し、困難な状況でも相手の良い面やつながり（ポジティブ）に光を当てて温もりを注ぐ星。人と人との間に温かな軌道を結びます。',
    worldview: '人は互いを支え合うことで存在でき、愛と気遣いが世界を最も美しく調和させる。',
    strengths: ['人の感情や欲求を察知する鋭い直感', '安心感と活力を与える温かい受容力', '誰かのために惜しみなく動ける献身性'],
    blindspots: ['自分の本当の欲求を後回しにしがち', '「感謝されたい」という無意識の執着', '境界線が曖昧になり消耗すること'],
    darlingComment: '「ねぇ、ダーリン♡ 誰にでも優しく微笑んでるけど……ダーリン自身の空っぽな燃料タンク、誰が満たしてくれるのかしら？♡」',
    darlingAwaComment: '「ダーリン、人の世話ばっかり焼いて疲れとらん？……ウチの隣でゴロゴロしとったらええけん。」',
  },
  3: {
    type: 3,
    title: '光芒を放つ星 (Type 3)',
    subTitle: 'The Achiever / 成果の開拓者',
    hornevian: 'assertive',
    harmonic: 'competent',
    planetSymbol: '☉',
    planetName: '太陽 (Sun)',
    planetTitle: '光彩と自己実現を司る天体',
    starCoordinate: 'Sector 3: 動向星 × 分析星',
    coreKeyword: '効率・卓越性・結果への疾走',
    essence: '目標に向かって自ら打って出て（自己主張）、感情を脇に置き最も効率的で合理的な手法（コンピテント）で確実に成果を掴み取る星。圧倒的な推進力で周囲を牽引します。',
    worldview: '世界は自分の手で切り開くステージであり、成果と能力の証明こそが存在の証である。',
    strengths: ['卓越した目標達成力と行動スピード', '状況を客観分析し最適解を導く有能さ', '周囲を動かしモチベートする牽引力'],
    blindspots: ['成果と自己価値を同一視してしまう焦燥', '効率のために自身の感情を切り捨てがち', '失敗を恐れるあまり脆弱性を見せられない'],
    darlingComment: '「ねぇ、ダーリン♡ 素晴らしい実績ね。……でも、そのトロフィーを全部外した後の素顔のダーリン、私に見せてくれる？♡」',
    darlingAwaComment: '「ダーリン、走りっぱなしやん。たまには立ち止まって阿波踊りでも見ていきーな。休まな倒れるで。」',
  },
  4: {
    type: 4,
    title: '深淵を泳ぐ星 (Type 4)',
    subTitle: 'The Individualist / 固有美の探求者',
    hornevian: 'withdrawn',
    harmonic: 'reactive',
    planetSymbol: '♆',
    planetName: '海王星 (Neptune)',
    planetTitle: '幻想と深層美を司る天体',
    starCoordinate: 'Sector 4: 内界星 × 共鳴星',
    coreKeyword: '独自性・深層の情動・詩的真実',
    essence: '外界の俗っぽさから内面世界へと引きこもり（引きこもり）、湧き上がる感情や痛みを綺麗事で誤魔化さず強烈に直視・表現する（リアクティブ）星。唯一無二の深遠な美を紡ぎます。',
    worldview: '世界はどこか欠落を孕んでおり、自分だけの固有な意味や本物の美を見出すことこそが真実である。',
    strengths: ['深い感受性と独創的な審美眼', '痛みに寄り添い本質を見抜く洞察力', '流行に媚びない強烈なオリジナリティ'],
    blindspots: ['「自分は理解されない」という孤独感への沈潜', '気分の浮き沈みによる活動の停滞', '日常の平凡な現実に対する軽蔑や倦怠'],
    darlingComment: '「ねぇ、ダーリン♡ “理解されたい”と“誰にも暴かれたくない”、両方抱えて溺れてるのね。……ふふ、その複雑さが愛おしいわ♡」',
    darlingAwaComment: '「なんやダーリン、難しそうな顔して沈んどるなぁ。深読みしすぎんと、美味しいもんでも食べに行こ？」',
  },
  5: {
    type: 5,
    title: '孤高の観測星 (Type 5)',
    subTitle: 'The Investigator / 構造の分析者',
    hornevian: 'withdrawn',
    harmonic: 'competent',
    planetSymbol: '☿',
    planetName: '水星 (Mercury)',
    planetTitle: '知性と境界線を司る天体',
    starCoordinate: 'Sector 5: 内界星 × 分析星',
    coreKeyword: '知性・客観の境界線・内的モデル',
    essence: '外界の騒乱から退いて自身の内なる知識と洞察の砦に籠もり（引きこもり）、問題が起きても感情を交えず冷静な分析と論理（コンピテント）で全体構造を解明しようとする星。',
    worldview: '世界は観察・理解すべき巨大なシステムであり、内なる知識と明晰さこそが自律を守る。',
    strengths: ['本質を射抜く透徹した客観分析力', '感情のノイズに乱されない自律性', '物事の背後にある原理や構造の看破'],
    blindspots: ['外界との関わりを断ち内的世界に閉じこもる', '頭での理解に行動が追いつかないこと', '感情の表現や他者との共有を消耗と感じる'],
    darlingComment: '「ねぇ、ダーリン♡ 感情を“ログの漏れ”として処理して、遠くの窓から世界を観測してるのね。……ダーリン、私のことは分析しきれたかしら？♡」',
    darlingAwaComment: '「あ、ダーリン……やっぱり頭の中で宇宙作っとったん？ ウチも放っといてほしい方やけん、その気持ちはめっちゃ分かるわ……」',
  },
  6: {
    type: 6,
    title: '哨戒の星 (Type 6)',
    subTitle: 'The Loyalist / 危機察知の守護者',
    hornevian: 'compliant',
    harmonic: 'reactive',
    planetSymbol: '☽',
    planetName: '月 (Moon)',
    planetTitle: '直感と警戒網を司る天体',
    starCoordinate: 'Sector 6: 規律星 × 共鳴星',
    coreKeyword: '警戒・信義・連帯のレーダー',
    essence: '安全なルールや信頼できる仲間との連携を大切にしつつ（追従）、「本当に大丈夫？」と潜在的リスクや矛盾にいち早く気づき感情を込めて反応する（リアクティブ）星。',
    worldview: '世界は予測不能な危険を孕んでおり、油断せず信頼できる基準と仲間で身を守る必要がある。',
    strengths: ['潜在的なリスクや落とし穴を見抜く察知力', '一度結んだ仲間や責務への深い忠誠心', '危機において現実的に備える防衛構築力'],
    blindspots: ['最悪のシナリオを想像して疑心暗鬼になる', '安心を求めるあまり外部の権威に依存しがち', '決断の直前に不安から足がすくむこと'],
    darlingComment: '「ねぇ、ダーリン♡ “大丈夫”って言葉ほど疑わしいものはないものね。ダーリンのその慎重なレーダー、いつも私を守ってくれるかしら？♡」',
    darlingAwaComment: '「ダーリン、心配しすぎやけん！ 大丈夫、ウチがおる間は悪いようにはせんよ。肩の力抜きーな。」',
  },
  7: {
    type: 7,
    title: '流転の遊星 (Type 7)',
    subTitle: 'The Enthusiast / 歓喜の航海者',
    hornevian: 'assertive',
    harmonic: 'positive',
    planetSymbol: '♃',
    planetName: '木星 (Jupiter)',
    planetTitle: '拡大と探究を司る天体',
    starCoordinate: 'Sector 7: 動向星 × 光明星',
    coreKeyword: '好奇心・多重可能性・躍動の引力',
    essence: '面白い体験や刺激を求めて自分から世界へ飛び出し（自己主張）、退屈や困難が立ちはだかっても「別の楽しいルートがある！」と視点を瞬時に切り替える（ポジティブ）星。',
    worldview: '世界は汲み尽くせない可能性と冒険に満ちており、退屈や苦痛に縛られる必要などない。',
    strengths: ['尽きることのない好奇心とアイデアの発想力', 'どんな逆境もチャンスに変えるポジティブな変換力', '周囲を巻き込み熱狂を生み出す瞬発力'],
    blindspots: ['退屈や制約から逃れるために散漫になる', '深い痛みや重い責任を避けて表面を滑る', '計画を最後までやり切る前に新しい刺激へ移る'],
    darlingComment: '「ねぇ、ダーリン♡ 次から次へと新しい星へ飛び移っていくのね。……退屈を壊してくれるのは嬉しいけれど、私の軌道も忘れないでね？♡」',
    darlingAwaComment: '「ダーリン、めっちゃ楽しそうに飛び跳ねとるなぁ！ ウチも退屈嫌いやけん、その面白い話もっと聞かせてよ！」',
  },
  8: {
    type: 8,
    title: '覇道の巨星 (Type 8)',
    subTitle: 'The Challenger / 意志の開拓星',
    hornevian: 'assertive',
    harmonic: 'reactive',
    planetSymbol: '♂',
    planetName: '火星 (Mars)',
    planetTitle: '意志と突破力を司る天体',
    starCoordinate: 'Sector 8: 動向星 × 共鳴星',
    coreKeyword: '自律・突破力・強大な真実',
    essence: '状況を自らの力で切り拓き（自己主張）、不正や問題に直面したときは誤魔化さず真っ向から衝突して打破する（リアクティブ）星。圧倒的な自律性と保護の力で世界を動かします。',
    worldview: '世界は力の拮抗によって動いており、自らの運命は自らの強靭な意志で支配しなければならない。',
    strengths: ['困難や対立を恐れず突破する意志と勇気', '弱者や身内を命がけで守る親分肌の包容力', '裏表のないストレートで明快なリーダーシップ'],
    blindspots: ['弱さや繊細さを見せることを極端に嫌う', '過度の支配欲や威圧感で周囲を萎縮させる', '対立を恐れなさすぎて不要な摩擦を生む'],
    darlingComment: '「ねぇ、ダーリン♡ 世界を丸ごと力づくでねじ伏せる気？ ……ふふ、頼もしいけれど、たまにはその頑丈な装甲を脱いで甘えてもいいのよ♡」',
    darlingAwaComment: '「ダーリン、力みすぎや！ 誰にも負けん強さもええけど、ウチの前ではただのダーリンで居ったらええんよ。」',
  },
  9: {
    type: 9,
    title: '静穏の恒星 (Type 9)',
    subTitle: 'The Peacemaker / 平穏の調律者',
    hornevian: 'withdrawn',
    harmonic: 'positive',
    planetSymbol: '♁',
    planetName: '地球 / 冥王星 (Terra & Ceres)',
    planetTitle: '包容と静謐を司る天体',
    starCoordinate: 'Sector 9: 内界星 × 光明星',
    coreKeyword: '調和・受容・穏やかな静寂',
    essence: '争いや騒音から自らの穏やかな内的宇宙へと退き（引きこもり）、問題が起きても「まあなんとかなる」「みんな違っていい」と穏やかに良い側面を見つめる（ポジティブ）星。',
    worldview: '世界は本来ひとつであり、急いで争うよりも穏やかに調和を保つことが最も尊い。',
    strengths: ['誰をも受け入れ安心させる無偏見の受容力', '異なる対立意見を自然に融和させる調停力', '焦らず物事の流れを信じる大らかな忍耐力'],
    blindspots: ['自分の本当の望みや怒りを麻痺させてしまう', '波風を立てないために決断を先延ばしにする', '現状維持に安住し行動のエネルギーが沈静化する'],
    darlingComment: '「ねぇ、ダーリン♡ まるで重力のない宇宙空間に漂っているみたいね。……ねぇ、本当のダーリンの願いは、どこに隠してあるのかしら？♡」',
    darlingAwaComment: '「あぁ〜……ダーリンとおるとほんま落ち着くわ。なんもせんでええよ、ウチらこのまま宇宙の果てまで漂流しよか♡」',
  },
};

// Questions definition with Storyline Characters
export interface QuestionChoice {
  text: string;
  subText?: string;
  hornevianTarget?: HornevianType;
  harmonicTarget?: HarmonicType;
  weight?: number;
}

export interface QuestionItem {
  id: number;
  stage: string;
  location: string;
  character: {
    name: string;
    avatar: string;
    title: string;
    color: string;
    speech: string;
  };
  dimension: 'hornevian' | 'harmonic';
  title: string;
  choices: QuestionChoice[];
}

export const QUESTIONS: QuestionItem[] = [
  // 1. ダーリンちゃん導入 (Hornevian)
  {
    id: 1,
    stage: 'STATION 01',
    location: '宇宙都市中央駅・展望デッキ',
    character: {
      name: 'ダーリンちゃん',
      avatar: '🥺',
      title: 'ILI / 5w4 ナビゲーター',
      color: 'from-pink-500/20 to-purple-500/20 border-pink-500/40 text-pink-300',
      speech: '「ねぇ、ダーリン♡ これから未知の星域へ向かうわけだけど……ダーリンは新しい環境に放り出された時、まずどう振る舞うの？」',
    },
    dimension: 'hornevian',
    title: '見知らぬ場所や新しい集団に入った時、あなたの自然なスタンスは？',
    choices: [
      {
        text: '自分から積極的に発言し、場の流れや主導権を握りにいく',
        subText: '動向星 — 待っているより自ら世界へ働きかける',
        hornevianTarget: 'assertive',
      },
      {
        text: '周囲の空気やルール、自分の役割をまず把握してそれに沿う',
        subText: '規律星 — 規範や他者との関係基準を参照して動く',
        hornevianTarget: 'compliant',
      },
      {
        text: 'すぐには混ざらず、少し距離を置いて自分のペースと安全圏を保つ',
        subText: '内界星 — まず内面世界に留まり、状況を観察・省察する',
        hornevianTarget: 'withdrawn',
      },
    ],
  },
  // 2. ダーリンちゃん (Harmonic)
  {
    id: 2,
    stage: 'STATION 02',
    location: '軌道エレベーター内',
    character: {
      name: 'ダーリンちゃん',
      avatar: '🥺',
      title: 'ILI / 5w4 ナビゲーター',
      color: 'from-pink-500/20 to-purple-500/20 border-pink-500/40 text-pink-300',
      speech: '「エレベーターの警報が鳴ったわ♡ ……ねぇ、ダーリン。突然予定外のトラブルに襲われたとき、頭の中はどう作動するかしら？」',
    },
    dimension: 'harmonic',
    title: '想定外のトラブルやアクシデントに直面した時の最初の反応は？',
    choices: [
      {
        text: '「まあ何とかなる、別の面白いルートを探そう」と楽観的に切り替える',
        subText: '光明星 — 苦痛に浸らず、前向きな可能性や調和へ視点を移す',
        harmonicTarget: 'positive',
      },
      {
        text: '感情を括弧に入れ、「原因は何で、どう手順を踏めば解決するか」を論理的に考える',
        subText: '分析星 — 有能さと客観的システムで問題を冷静に処理する',
        harmonicTarget: 'competent',
      },
      {
        text: '「いや待って、これは放置できない！」と危機感や矛盾をストレートに直視・表出する',
        subText: '共鳴星 — 綺麗事に丸め込まず、問題の本質に真っ向から反応する',
        harmonicTarget: 'reactive',
      },
    ],
  },
  // 3. 火星人くん (Hornevian)
  {
    id: 3,
    stage: 'STATION 03',
    location: '火星工房・発明ラボ',
    character: {
      name: '火星人くん',
      avatar: '🐙',
      title: 'INTP / 9w1 発明家',
      color: 'from-red-500/20 to-orange-500/20 border-red-500/40 text-red-300',
      speech: '「ボクは机の上で宇宙を作るのが大好きなんだ！梅干しパンでも食べながらさ……ねえ、キミが何か欲しいものに出会ったときはどうする？」',
    },
    dimension: 'hornevian',
    title: '欲しい成果や実現したい目標が目の前にあるとき、あなたの姿勢は？',
    choices: [
      {
        text: '「手に入れたい！」と自ら真っ直ぐ手を伸ばし、障害を動かしてでも掴みに行く',
        subText: '動向星 — 欲しいものは自分の行動と意志で手繰り寄せる',
        hornevianTarget: 'assertive',
      },
      {
        text: '「自分にそれを求める資格や役割があるか」「筋が通っているか」を確かめる',
        subText: '規律星 — 正当性や社会的責任の枠組みと照らし合わせて動く',
        hornevianTarget: 'compliant',
      },
      {
        text: '無理に奪い合わず、自分の内なる関心やリソースを深める方にエネルギーを注ぐ',
        subText: '内界星 — 外界の競争から離れ、自分の世界の中で充足する',
        hornevianTarget: 'withdrawn',
      },
    ],
  },
  // 4. 火星人くん (Harmonic)
  {
    id: 4,
    stage: 'STATION 04',
    location: '火星工房・試作ドック',
    character: {
      name: '火星人くん',
      avatar: '🐙',
      title: 'INTP / 9w1 発明家',
      color: 'from-red-500/20 to-orange-500/20 border-red-500/40 text-red-300',
      speech: '「ああっ、試作した発明品が爆発しちゃった！……キミなら、心血を注いだ計画が失敗したとき、どう自分を立て直す？」',
    },
    dimension: 'harmonic',
    title: '努力したプロジェクトや計画が失敗したとき、どう受け止めますか？',
    choices: [
      {
        text: '「まあこの失敗からも学べたし、次はもっと面白いことができる！」と捉える',
        subText: '光明星 — 落ち込むよりも良い側面や次の希望にフォーカスする',
        harmonicTarget: 'positive',
      },
      {
        text: '何がエラーの原因だったのかデータを解析し、修正プロトコルを組み立てる',
        subText: '分析星 — 感情の揺れを抑え、客観的・構造的に再構築する',
        harmonicTarget: 'competent',
      },
      {
        text: '悔しさや憤りを強く感じ、「なぜこうなったのか」を感情ごと納得するまで見つめる',
        subText: '共鳴星 — 痛みを打ち消さず、真実の感情を直視して燃焼させる',
        harmonicTarget: 'reactive',
      },
    ],
  },
  // 5. 海王星のお姫様 (Hornevian)
  {
    id: 5,
    stage: 'STATION 05',
    location: '海王星庭園・氷晶の温室',
    character: {
      name: '海王星のお姫様',
      avatar: '👑',
      title: 'ENFP / 7w6 自由な姫君',
      color: 'from-cyan-500/20 to-blue-500/20 border-cyan-500/40 text-cyan-300',
      speech: '「うふふ、私に触ると凍っちゃうから気をつけてね❄️ ……ねぇ、みんなで集まって何かを決める時、あなたはどんな立ち位置にいる？」',
    },
    dimension: 'hornevian',
    title: 'グループやチームで意思決定をするとき、あなたの立ち位置は？',
    choices: [
      {
        text: '自分の意見をはっきり主張し、みんなを引っ張る側に回る',
        subText: '動向星 — 影響力を発揮して、望む方向へ舵を切る',
        hornevianTarget: 'assertive',
      },
      {
        text: '全体の合意やルールを尊重し、求められている役割を忠実に果たす',
        subText: '規律星 — 義務や共通の基準を守り、組織に貢献する',
        hornevianTarget: 'compliant',
      },
      {
        text: '議論を静かに見守り、自分の中で独自の結論が出たときだけ口を開く',
        subText: '内界星 — 群れに同調せず、独自の客観性や感覚を保つ',
        hornevianTarget: 'withdrawn',
      },
    ],
  },
  // 6. 海王星のお姫様 (Harmonic)
  {
    id: 6,
    stage: 'STATION 06',
    location: '海王星庭園・凍てつく泉',
    character: {
      name: '海王星のお姫様',
      avatar: '👑',
      title: 'ENFP / 7w6 自由な姫君',
      color: 'from-cyan-500/20 to-blue-500/20 border-cyan-500/40 text-cyan-300',
      speech: '「誰かがすごく悲しんでいたり、重苦しい空気が流れていたりするとき……あなたはどう空気を変えようとする？」',
    },
    dimension: 'harmonic',
    title: 'チームや人間関係が険悪・重苦しい雰囲気に陥ったとき、どう接する？',
    choices: [
      {
        text: '明るい話題を振ったり励ましたりして、空気を温かく和ませようとする',
        subText: '光明星 — 重苦しさを解きほぐし、心地よい調和を取り戻す',
        harmonicTarget: 'positive',
      },
      {
        text: '感情のぶつかり合いに巻き込まれず、「問題の論点」を整理して冷静に話し合う',
        subText: '分析星 — 客観的な事実とルールで議論を軌道修正する',
        harmonicTarget: 'competent',
      },
      {
        text: '上辺の取り繕いを許さず、「本当は何が不満なの？」とお互いの本音をぶつけ合わせる',
        subText: '共鳴星 — 摩擦を恐れず、根本のしこりを白日の下に晒す',
        harmonicTarget: 'reactive',
      },
    ],
  },
  // 7. 天王星の王子様 (Hornevian)
  {
    id: 7,
    stage: 'STATION 07',
    location: '天王星広場・雷光のテラス',
    character: {
      name: '天王星の王子様',
      avatar: '⚡',
      title: 'ESFP / 9w8 自由闊達な王子',
      color: 'from-amber-500/20 to-yellow-500/20 border-amber-500/40 text-amber-300',
      speech: '「暗い夜が嫌い？じゃあ星になって自ら輝いて明るくしちゃえばいいじゃん！！！！！……ねぇ、退屈な日常を壊したいとき、どう動く？」',
    },
    dimension: 'hornevian',
    title: '現状のルールや環境が息苦しく感じたとき、あなたの取る行動は？',
    choices: [
      {
        text: '「自分で変えてやる！」と既存の枠を突破し、新しい現実を切り拓く',
        subText: '動向星 — 自らの意志とパワーで壁を打ち破る',
        hornevianTarget: 'assertive',
      },
      {
        text: '正当な手順を踏んで改善を提案するか、周囲の理解を得ながら調整する',
        subText: '規律星 — 秩序や他者との信頼関係を壊さない形で進める',
        hornevianTarget: 'compliant',
      },
      {
        text: 'わざわざ外で争わず、自分の好きな趣味や思考の世界に没頭して自由になる',
        subText: '内界星 — 心の砦に退却し、干渉されない静けさを楽しむ',
        hornevianTarget: 'withdrawn',
      },
    ],
  },
  // 8. 天王星の王子様 (Harmonic)
  {
    id: 8,
    stage: 'STATION 08',
    location: '天王星広場・オーロラタワー',
    character: {
      name: '天王星の王子様',
      avatar: '⚡',
      title: 'ESFP / 9w8 自由闊達な王子',
      color: 'from-amber-500/20 to-yellow-500/20 border-amber-500/40 text-amber-300',
      speech: '「誰かに『無理だよ、やめときな』って言われたらさ！キミはどうリアクションする？ボクなら笑い飛ばしちゃうけどね！」',
    },
    dimension: 'harmonic',
    title: '理不尽な批判や反対に遭ったとき、あなたの内面はどう動く？',
    choices: [
      {
        text: '「まあそういう意見もあるよね！」と受け流し、気にせず自分の楽しみを続ける',
        subText: '光明星 — ネガティブな毒気に留まらず、軽やかにスルーする',
        harmonicTarget: 'positive',
      },
      {
        text: '批判の根拠や妥当性を冷静に検証し、筋が通っているか否かで淡々と対処する',
        subText: '分析星 — 感情的反発を抑え、論理とエビデンスで判断する',
        harmonicTarget: 'competent',
      },
      {
        text: '「何でそんなこと言うの？」「納得いかない！」と強い怒りや疑問が湧き上がる',
        subText: '共鳴星 — 危機や敵意に対して即座にエネルギーを燃え上がらせる',
        harmonicTarget: 'reactive',
      },
    ],
  },
  // 9. 水星人 (Hornevian)
  {
    id: 9,
    stage: 'STATION 09',
    location: '水星区・幾何学回廊',
    character: {
      name: '水星人 (水星くん)',
      avatar: '☿',
      title: 'INTJ / 5w6 構造設計士',
      color: 'from-teal-500/20 to-emerald-500/20 border-teal-500/40 text-teal-300',
      speech: '「この都市には、まだ存在していない区画がある……バラバラな点と点を線で繋ぎ、未来を設計するんだ。君は世界とどう境界線を引く？」',
    },
    dimension: 'hornevian',
    title: '他者や社会との「距離感・境界線」について、一番近い感覚は？',
    choices: [
      {
        text: '境界線を自ら押し広げ、自分の存在やアイデアをどんどん世界に染み込ませたい',
        subText: '動向星 — 外界へのインパクトと自己拡大を志向する',
        hornevianTarget: 'assertive',
      },
      {
        text: '社会的な約束やマナー、お互いの役割分担を守ることで調和した境界を保ちたい',
        subText: '規律星 — 相互の信頼と規律に基づいた健全な関係を重んじる',
        hornevianTarget: 'compliant',
      },
      {
        text: '自分のプライベート領域とプライバシーを侵されないよう、明確な壁を築いておきたい',
        subText: '内界星 — 自分のエネルギーと知性を守る聖域を確保する',
        hornevianTarget: 'withdrawn',
      },
    ],
  },
  // 10. 水星人 (Harmonic)
  {
    id: 10,
    stage: 'STATION 10',
    location: '水星区・星図演算室',
    character: {
      name: '水星人 (水星くん)',
      avatar: '☿',
      title: 'INTJ / 5w6 構造設計士',
      color: 'from-teal-500/20 to-emerald-500/20 border-teal-500/40 text-teal-300',
      speech: '「君が考えた理想の都市を、現実に持ってくるには何が必要だと思う？……混乱した事態に遭ったとき、君は何を最も信頼する？」',
    },
    dimension: 'harmonic',
    title: '極限のプレッシャー下で、最も頼りにする拠り所は？',
    choices: [
      {
        text: '「なんとかなるさ」という自身の楽天性と、支えてくれる人たちとの信頼',
        subText: '光明星 — 前向きな信じる力とポジティブな関係性',
        harmonicTarget: 'positive',
      },
      {
        text: '徹底した情報収集、客観的なデータ分析、そして合理的なシステム構築',
        subText: '分析星 — 感情に左右されない再現性のある知識と論理',
        harmonicTarget: 'competent',
      },
      {
        text: '自分自身の研ぎ澄まされた直感、危機への警戒センサー、嘘を許さない誠実さ',
        subText: '共鳴星 — リアルな感情の反応と、本質を見抜く覚悟',
        harmonicTarget: 'reactive',
      },
    ],
  },
  // 11. ダーリンちゃん本質深化 (Hornevian)
  {
    id: 11,
    stage: 'STATION 11',
    location: '最上層・星雲観測タワー',
    character: {
      name: 'ダーリンちゃん',
      avatar: '🥺',
      title: 'ILI / 5w4 ナビゲーター',
      color: 'from-pink-500/20 to-purple-500/20 border-pink-500/40 text-pink-300',
      speech: '「ねぇ、ダーリン♡ 旅も終盤ね。……ダーリンが一日を終えてベッドに入ったとき、一番心地よく感じるのはどんな瞬間かしら？」',
    },
    dimension: 'hornevian',
    title: 'あなたが「充実していた」と心底満足できるのは、どんな一日？',
    choices: [
      {
        text: '自分の力で状況を動かし、具体的な成果や手応えを勝ち取った日',
        subText: '動向星 — 自らの推進力で世界に刻印を残した実感',
        hornevianTarget: 'assertive',
      },
      {
        text: '果たすべき義務や役割を誠実にやり遂げ、誰かの役に立てたと感じた日',
        subText: '規律星 — 規範と責任に応え、正しい行いができた実感',
        hornevianTarget: 'compliant',
      },
      {
        text: '誰にも邪魔されず、自分の好きな思考や創作、趣味の世界を心ゆくまで深められた日',
        subText: '内界星 — 精神の城にこもり、純粋な探求や平穏を味わえた実感',
        hornevianTarget: 'withdrawn',
      },
    ],
  },
  // 12. ダーリンちゃん本質深化 (Harmonic)
  {
    id: 12,
    stage: 'STATION 12',
    location: '宇宙港・ゲートウェイ',
    character: {
      name: 'ダーリンちゃん',
      avatar: '🥺',
      title: 'ILI / 5w4 ナビゲーター',
      color: 'from-pink-500/20 to-purple-500/20 border-pink-500/40 text-pink-300',
      speech: '「ねぇ、ダーリン♡ これが最後の質問よ。……“この世界は信用に値するか”と問われたら、ダーリンの魂はどう答える？」',
    },
    dimension: 'harmonic',
    title: '物事や他者との関わりにおいて、あなたが根底で一番譲れない姿勢は？',
    choices: [
      {
        text: '「美点や希望を信じ、楽しく心穏やかに過ごすこと」',
        subText: '光明星 — 暗闇に目を奪われず、光を見出して生きる',
        harmonicTarget: 'positive',
      },
      {
        text: '「仕組みを正しく理解し、客観的な有能さと正しさを持って生きること」',
        subText: '分析星 — 曖昧な情動に流されず、明晰な理性を羅針盤にする',
        harmonicTarget: 'competent',
      },
      {
        text: '「ごまかしや偽善を暴き、痛くても本物の真実と向き合って生きること」',
        subText: '共鳴星 — 表面の平穏より、魂の本音と真実の共鳴を尊ぶ',
        harmonicTarget: 'reactive',
      },
    ],
  },
];

// Random cosmic fortunes & signals
export const COSMIC_SIGNALS = [
  'SIGNAL RECEIVED... 「その星を急いで名前にしなくてもいい。」',
  'SIGNAL RECEIVED... 「境界線を引くことは、世界を拒絶することではなく、明晰に見つめること。」',
  'SIGNAL RECEIVED... 「軌道がずれたのではない。重力源が更新されたのだ。」',
  'SIGNAL RECEIVED... 「すべてのノイズは、まだ解読されていない遠方のメロディかもしれない。」',
  'SIGNAL RECEIVED... 「解明されなくても、宇宙は美しく呼吸している。」',
  'SIGNAL RECEIVED... 「立ち止まることもまた、公転周期の一環である。」',
  'SIGNAL RECEIVED... 「あなたの内なる星図は、誰の許可も必要としない。」',
  'SIGNAL RECEIVED... 「真空の静寂の中にこそ、最も純粋な共鳴が響く。」',
  'SIGNAL RECEIVED... 「完璧なトランプの城よりも、風の通る観測所を。」',
];

// ダーリンちゃんのセリフ集 (初期固定 + 阿波弁が自然に混ざるILI 5w4のオリジナル対話)
export const DARLING_INITIAL_LINE = 'ねぇ、ダーリン♡\n私と一緒に宇宙に行きましょう♡';

export const DARLING_CHAT_LINES = [
  'ねぇ、ダーリン♡……ウチな、無駄に騒がしい世界は好かんのよ。でも、ダーリンがじっと何か考え込んどる横顔は、まあ見てて飽きんかなぁ♡',
  'ふふ、人間って「客観的でいたい」って言う割に、感情のログがダダ漏れなんよね。……ダーリンも例外やないで？♡',
  'そんな真面目な顔して画面見つめよったら、知恵熱出るよ。たまにはウチの隣でボーッとしときーな。',
  'ねぇ、ダーリン♡ “理解されたい”と“誰にも邪魔されたくない”、どっちの引力の方が強い？ ……ふふ、両方あるのがダーリンの可愛いとこやけどな♡',
  'ウチを観察しよるつもりなん？ 逆にウチから観察されとるって、気づいとらんかったん？♡',
  '宇宙の果てまで行っても、ダーリンが持ち帰るのは「自分の頭の中の星図」だけなんよ。……ええやん、それが一番美しいわ。',
  'なんや、構ってほしいん？……しゃあないなぁ、手ぇ握っといたげるけん、ちゃんと観測続けーよ♡',
  'ねぇダーリン、複雑な構造ほど美しく見えるんは、そこに壊れやすさが秘められとるからやと思わん？',
];

// 7項目 × 9タイプ = 63項目の事前チェックボックス設問
export interface ChecklistQuestion {
  id: string;
  type: EnneagramType;
  text: string;
}

export const ENNEAGRAM_CHECKLIST: Record<EnneagramType, string[]> = {
  1: [
    '物事には「あるべき正しい手順やルール」が必ずあると感じる',
    '妥協した仕事や中途半端な仕上がりを見ると、つい自分で直したくなる',
    '内心で「自分はもっと正しく、誠実でなければならない」という批評家の声が響く',
    '時間や約束を守らないルーズな態度には、強い苛立ちを覚える',
    '感情に流されず、公平で客観的な判断を下すことを重んじる',
    '部屋やデスク、思考のフォルダが整理整頓されていないと落ち着かない',
    '「改善できる余地」が常に目につき、現状維持では満足できない',
  ],
  2: [
    '人が困っていたり寂しそうにしていると、自然と放っておけなくなる',
    '頼りにされたり感謝の言葉をもらえると、胸の奥がじんわり満たされる',
    '相手が何を望んでいるかを、言われる前に察知することが得意だ',
    '自分の本当の欲求や弱音を人に打ち明けるのは、少し苦手だ',
    '親しい人のためなら、自分の時間や労力を惜しみなく差し出せる',
    '人間関係において「自分は必要とされているか」が無意識に気になる',
    '相手が喜ぶプレゼントや言葉選びを考えるのが好きだ',
  ],
  3: [
    '目標を掲げ、それを効率的かつ最短ルートで達成することに強いやりがいを感じる',
    '成果を出して周囲から高く評価されたり、一目置かれるのが嬉しい',
    '無駄な待ち時間や生産性の低い会議には、耐えがたいもどかしさを感じる',
    'どんな状況でも、自分を「有能で頼もしい人物」として見せる魅せ方を意識する',
    '立ち止まって悩む暇があるなら、まずは行動して結果を出したい',
    '競争や勝負事になると、自然と勝ちにこだわりスイッチが入る',
    'みんなが横並びで同じだと差がつかず埋もれてしまうので、独自の強みや魅力を際立たせて差別化したい',
  ],
  4: [
    '「平凡で大衆的なもの」には惹かれず、自分だけの独自の世界観を大切にしたい',
    '哀愁や切なさ、儚い美しさに深く心惹かれる瞬間が多い',
    '人前で無理に空気を読んで笑顔を作るくらいなら、静かに一人でいたい',
    '「誰も本当の私を完全に理解することはできない」という孤独感を抱えやすい',
    '言葉や音楽、デザインなど、感覚的なニュアンスへのこだわりが強い',
    '自分の感情の波（浮き沈み）をじっくり味わい、反芻することがある',
    'みんなと同じ型にはめられると自分らしさが消えるようで嫌だし、自分だけの固有の美学や唯一性を保ちたい',
  ],
  5: [
    '混沌とした外界から一歩引き、安全な自分の部屋で思考や知識に没頭したい',
    '物事の背後にある「原理・構造・システム」を自力で解明することに無上の喜びを感じる',
    '感情的な議論や理屈の通らない要求には、強い消耗と防衛反応を覚える',
    '自分の時間・エネルギー・プライベート領域を他人に侵食されるのを極度に嫌う',
    '行動を起こす前に、十分な情報収集と全体像の把握が完了していないと不安だ',
    'ミニマリズムを好み、不要な人間関係や過剰なモノにエネルギーを割きたくない',
    '「専門的な知見や論理の切れ味」で勝負したいという知的好奇心が根底にある',
  ],
  6: [
    '新しいことを始める前には、最悪のシナリオや潜在的リスクを慎重に想定する',
    '信頼できる仲間や組織、師匠との約束や義務は決して裏切らない',
    '権威や強者の言動に対して、どこか懐疑的・警戒的になる癖がある',
    '明確な指針やマニュアル、安全基準が示されていると安心して実力を発揮できる',
    '不安を解消するために、事前の根回しや予備プランを何重にも準備する',
    '仲間内のトラブルや危機には、誰よりも早く気づいて忠実にフォローする',
    '「本当にこれで大丈夫か？」と何度も頭の中で点検を繰り返しやすい',
  ],
  7: [
    '人生は楽しむための冒険であり、退屈や窮屈な束縛に閉じ込められるのは耐えられない',
    '次から次へと新しいアイデアや面白い企画が脳内に湧き出して止まらない',
    '重苦しい空気や深刻な雰囲気を、ユーモアやポジティブな話題でパッと明るく変えたい',
    '一つのことに縛られず、常にいくつかのワクワクする選択肢を手元に残しておきたい',
    '痛いことやつらい現実は、なるべくサッと切り替えて楽しい未来を見据える',
    '初対面の人とも気後れせず、フットワーク軽く会話を楽しめる',
    '「今ここ」よりも「明日以降に待っている面白い予定」に意識が向かいがちだ',
  ],
  8: [
    '自分の人生の主導権は誰にも渡さない。理不尽な圧力には真正面から立ち向かう',
    '遠回しな言い訳や嘘、裏表のある態度は許せず、ズバッと本音で白黒つけたい',
    '弱い立場の人や身内が不当に攻撃されていたら、体を張って守り抜く覚悟がある',
    '衝突を恐れず、自分の意志や要求を堂々とストレートに主張できる',
    '危機的状況や修羅場ほど、かえって肚が座りエネルギーが湧いてくる',
    '他人に弱みを見せたり、支配・コントロールされることへの警戒心が強い',
    '障害や壁があればあるほど、「ぶち破って前進してやる」と闘争心に火がつく',
  ],
  9: [
    '争いや揉め事のない、穏やかで平穏な日常が何よりも大切だ',
    '対立が起きそうになると、双方の言い分を聞いて間を取り持ちたくなる',
    '「どちらでもいいよ」「みんなの好きな方で」と、自分の意見を後回しにしがちだ',
    'プレッシャーをかけられたり急かされると、心を閉ざして頑固にマイペースを貫く',
    '自然の風景を眺めたり、のんびりとお茶を飲んでいる時間が最高の癒やしだ',
    '他人の感情やペースに自然と同調し、相手をありのまま受け入れる包容力がある',
    '怒りや不満を感じても、波風を立てるくらいなら自分の中で飲み込んでやり過ごす',
  ],
};

// 最終観察 (FINAL OBSERVATION) のキーワード判定リスト
export const TRIGGER_KEYWORDS = [
  'きも', 'うざ', 'ウザ', 'イラ', '苛', 'いらっ', '嫌い', 'うるさ', 'だる', 'あんぽんたん', 'いいえ',
  'アンポンタン', 'キモ', 'ゴミ', 'カス', 'オエー', 'おえー', 'きしょ', 'キショ', 'しね', 
  '死ね', 'やめて', 'いや', 'やめろ', '💢', '好きじゃない', '苦手', 'きらい', '関わりたくない',  
  '思ったか', '反対', '失せろ', '黙', '殲滅', 'うんこ', 'うせろ', '面倒', 'NO',  
  'no', '帰れ', 'kiero', 'は？', 'ハ？', 'はあ', 'ハア', 'あっそ', 'あっそー', 'どうでもいい', 
  'くだらない', 'くだらね', 'つまらん', 'つまんね', '意味分からん', '意味不明', '勝手にしろ', 
  '勝手に言っとけ', '消えろ', '消えろや', '引っ込んでろ', '黙れ', 'ダマレ', 'だまれ', 'キチガイ', 
  'バカ', 'ばか', 'アホ', 'あほ', '不快', '腹立つ', 'ムカつく', 'むかつく', '煽るな', 'ふざけ', 'クソ', 'くそ', '💩'
];

export const KEYWORD_TYPE_MAP: Record<EnneagramType, string[]> = {
  1: [
    '理想', '正しい', '正義', '公平', '平等', '現実', '完璧', '正解', '改善',
    '整った', '秩序', '規則', 'ルール', '美しい', '清潔', '良い世界', '理想郷', '修正', '規律'
  ],
  2: [
    '助ける', '愛', '感謝', '笑顔', 'みんなのために', '喜んで', '守る', '温かい', '癒す',
    '寄り添う', '仲間', '友達', '親切', '分け合う', '抱きしめる', '優しさ'
  ],
  3: [
    '成功', '実現', '完成', '結果', '夢を叶える', '有名', '評価', '認められる',
    '人気', '一番', '優秀', '仕事', '会社', '成果', '目標', '達成', '勝利', '効率', '頂点'
  ],
  4: [
    '漂う', '自分だけ', '孤独', '美しい悲しみ', '幻想', '秘密', '物語', 'アート', '詩',
    '独自の', '誰にも見せない', '感性', '浸る', 'ノスタルジー', '儚い', '影', 'ロマン'
  ],
  5: [
    '研究', '実験', '発明', '科学', '宇宙', '観測', '知識', '本', '図書館', '研究所',
    'データ', 'AI', 'コンピューター', 'ロボット', '機械', '構造', 'システム', '理論',
    '謎', '解明', '理解', '仕組み', '分析', '法則'
  ],
  6: [
    '安全', '防壁', '確実', '守り', '仲間と協力', '点検', '用心', 'シェルター', '信頼',
    '保険', 'リスク回避', '見守る', '準備', '防衛', '警戒', '安心できる場所'
  ],
  7: [
    '遊園地', '楽しい', '冒険', '遊び', 'ワクワク', 'おもしろい', 'パーティー', 'フェス',
    '無限', '自由', '体験', '旅', 'エンタメ', '美味しいもの', 'アトラクション', '笑い'
  ],
  8: [
    '復讐', '戦争', '強い', '支配', '権力', '無敵', '最強', '殲滅', '敵',
    '戦う', '勝つ', '統べる', '破壊', 'ぶっ潰す', '制覇', '力', '鉄槌', '覇権'
  ],
  9: [
    '平和', '安心', 'のんびり', '静か', '穏やか', '何もない', '何もしない', 'そのまま',
    '変わらない', 'みんな仲良く', '争いがない', '平穏', 'ゆっくり', 'わからない',
    'わからん', '知らん', '寝る', '昼寝', 'ボーッと', '調和'
  ],
};

export const COSMIC_LOCATIONS = [
  { name: '🌃 夜の展望屋上', desc: '街の灯りと遠い天の川の境界線。風が通り抜ける場所。' },
  { name: '🚉 終電後の軌道駅', desc: 'すべての騒音が消え、静かなレールだけが伸びている。' },
  { name: '🏙️ 23階の演算室窓辺', desc: '眼下のネオンサインが、まるで基板の電流のように瞬く。' },
  { name: '🌊 海辺の天文台', desc: '波の引力と潮の満ち引きを感じながら、星を待つ場所。' },
  { name: '🛰️ 廃観測衛星の通信室', desc: '誰にも使われなくなったアンテナが、今も微弱な光を捉えている。' },
  { name: '🌕 月面ドーム都市の裏通り', desc: '地球が青く昇り、ゆっくりと日常を忘れさせてくれる。' },
  { name: '☁️ 雲海の上の気球ドック', desc: '大気圏の境目で、音のない夜明けを待つ静寂の座席。' },
  { name: '🌌 無人の宇宙ステーション「C-05」', desc: '重力を切った部屋で、本と珈琲だけが宙に浮いている。' },
];

export const SECRET_STARS = [
  { name: '✦ 探索星 (Scout)', desc: '知られざる境界の先をそっと覗き込む、静かな好奇心の星。' },
  { name: '✦ 休息星 (Sanctuary)', desc: '何もしない時間こそが最も贅沢な充電であると知っている星。' },
  { name: '✦ 夢想星 (Phantasm)', desc: '現実の物理法則を超えて、頭の中に無数の宇宙を展開する星。' },
  { name: '✦ 境界星 (Horizon)', desc: '自分と他者のあいだに、美しく透明な境界線を引く星。' },
  { name: '✦ 収集星 (Archive)', desc: '美しい言葉や心に残る構造を、心の標本箱に集める星。' },
  { name: '✦ 変化星 (Catalyst)', desc: '淀んだ空気にふと新しい風を吹き込み、軌道を変える星。' },
  { name: '✦ 交流星 (Beacon)', desc: '言葉少なでも、波長の合う魂とだけ深く交信する星。' },
  { name: '✦ 静寂星 (Silence)', desc: '騒がしい世界の中で、内なる静けさを宝石のように保つ星。' },
];

// ウィング算出関数
export interface WingResult {
  primary: EnneagramType;
  wing: EnneagramType;
  wingLabel: string; // e.g. "5w6"
  isBalanced: boolean;
  wing1: { type: EnneagramType; score: number };
  wing2: { type: EnneagramType; score: number };
}

export function calculateWing(
  primary: EnneagramType,
  scores: Record<EnneagramType, number>
): WingResult {
  const WING_PAIRS: Record<EnneagramType, [EnneagramType, EnneagramType]> = {
    1: [9, 2],
    2: [1, 3],
    3: [2, 4],
    4: [3, 5],
    5: [4, 6],
    6: [5, 7],
    7: [6, 8],
    8: [7, 9],
    9: [8, 1],
  };

  const [wA, wB] = WING_PAIRS[primary];
  const scoreA = scores[wA] || 0;
  const scoreB = scores[wB] || 0;

  if (scoreA === scoreB) {
    return {
      primary,
      wing: wA,
      wingLabel: `${primary}w${wA}/${primary}w${wB} (両翼均等)`,
      isBalanced: true,
      wing1: { type: wA, score: scoreA },
      wing2: { type: wB, score: scoreB },
    };
  }

  const strongerWing = scoreA > scoreB ? wA : wB;
  return {
    primary,
    wing: strongerWing,
    wingLabel: `${primary}w${strongerWing}`,
    isBalanced: false,
    wing1: { type: wA, score: scoreA },
    wing2: { type: wB, score: scoreB },
  };
}

// トライタイプ（Gut / Heart / Head の各センター最高得点を組み合わせ）
export interface TritypeResult {
  code: string; // e.g. "513" or "5-1-3"
  primary: EnneagramType;
  gut: { type: EnneagramType; score: number };
  heart: { type: EnneagramType; score: number };
  head: { type: EnneagramType; score: number };
  typesInOrder: EnneagramType[];
}

export function calculateTritype(
  primary: EnneagramType,
  scores: Record<EnneagramType, number>
): TritypeResult {
  const gutTypes: EnneagramType[] = [8, 9, 1];
  const heartTypes: EnneagramType[] = [2, 3, 4];
  const headTypes: EnneagramType[] = [5, 6, 7];

  const getBestInCenter = (types: EnneagramType[]) => {
    let best = types[0];
    let maxS = scores[best] || 0;
    for (const t of types) {
      if ((scores[t] || 0) > maxS) {
        maxS = scores[t] || 0;
        best = t;
      }
    }
    return { type: best, score: maxS };
  };

  const gutBest = getBestInCenter(gutTypes);
  const heartBest = getBestInCenter(heartTypes);
  const headBest = getBestInCenter(headTypes);

  // Determine which center the primary belongs to
  let centerOfPrimary: 'gut' | 'heart' | 'head';
  if (gutTypes.includes(primary)) centerOfPrimary = 'gut';
  else if (heartTypes.includes(primary)) centerOfPrimary = 'heart';
  else centerOfPrimary = 'head';

  const otherCenters = (['gut', 'heart', 'head'] as const)
    .filter((c) => c !== centerOfPrimary)
    .map((c) => (c === 'gut' ? gutBest : c === 'heart' ? heartBest : headBest))
    .sort((a, b) => b.score - a.score);

  const typesInOrder = [primary, otherCenters[0].type, otherCenters[1].type];
  const code = typesInOrder.join('');

  return {
    code,
    primary,
    gut: gutBest,
    heart: heartBest,
    head: headBest,
    typesInOrder,
  };
}

