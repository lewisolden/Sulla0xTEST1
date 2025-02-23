import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useProgress } from "@/context/progress-context";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowLeft, ArrowRight, Wallet, LucideIcon, Shield, Key, Lock, CheckCircle2, XCircle, TrendingUp, CreditCard, Building2, AlertTriangle, CheckCircle } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { GettingStartedQuiz } from "@/components/quizzes/GettingStartedQuiz";
import { SecurityIcon, WalletIcon } from "@/components/icons/CryptoIcons";
import { GettingStartedDiagram } from "@/components/diagrams/GettingStartedDiagram";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Eye, EyeOff } from "lucide-react";
import { useScrollTop } from "@/hooks/useScrollTop";

// Add seed word list
const SEED_WORD_LIST = [
  'abandon', 'ability', 'able', 'about', 'above', 'absent', 'absorb', 'abstract', 'absurd', 'abuse',
  'access', 'accident', 'account', 'accuse', 'achieve', 'acid', 'acoustic', 'acquire', 'across', 'act',
  'active', 'activity', 'actor', 'actress', 'actual', 'adapt', 'add', 'addict', 'address', 'adjust',
  'admit', 'adult', 'advance', 'advice', 'aerobic', 'affair', 'afford', 'afraid', 'again', 'age',
  'agent', 'agree', 'ahead', 'aim', 'air', 'airport', 'aisle', 'alarm', 'album', 'alcohol',
  'alert', 'alien', 'all', 'alley', 'allow', 'almost', 'alone', 'alpha', 'already', 'also',
  'alter', 'always', 'amateur', 'amazing', 'among', 'amount', 'amused', 'analyst', 'anchor', 'ancient',
  'anger', 'angle', 'angry', 'animal', 'ankle', 'announce', 'annual', 'another', 'answer', 'antenna',
  'antique', 'anxiety', 'any', 'apart', 'apology', 'appear', 'apple', 'approve', 'april', 'arch',
  'arctic', 'area', 'arena', 'argue', 'arm', 'armed', 'armor', 'army', 'around', 'arrange',
  'arrest', 'arrive', 'arrow', 'art', 'artefact', 'artist', 'artwork', 'ask', 'aspect', 'assault',
  'asset', 'assist', 'assume', 'asthma', 'athlete', 'atom', 'attack', 'attend', 'attitude', 'attract',
  'auction', 'audit', 'august', 'aunt', 'author', 'auto', 'autumn', 'average', 'avocado', 'avoid',
  'awake', 'aware', 'away', 'awesome', 'awful', 'awkward', 'axis', 'baby', 'bachelor', 'bacon',
  'badge', 'bag', 'balance', 'balcony', 'ball', 'bamboo', 'banana', 'banner', 'bar', 'bare',
  'bargain', 'barrel', 'base', 'basic', 'basket', 'battle', 'beach', 'bean', 'beauty', 'because',
  'become', 'beef', 'before', 'begin', 'behave', 'behind', 'believe', 'below', 'belt', 'bench',
  'benefit', 'best', 'bet', 'better', 'between', 'beyond', 'bicycle', 'bid', 'bike', 'bind',
  'biology', 'bird', 'birth', 'bitter', 'black', 'blade', 'blame', 'blanket', 'blast', 'bleak',
  'bless', 'blind', 'blood', 'blossom', 'blouse', 'blue', 'blur', 'blush', 'board', 'boat',
  'body', 'boil', 'bomb', 'bone', 'bonus', 'book', 'boost', 'border', 'boring', 'borrow',
  'boss', 'bottom', 'bounce', 'box', 'boy', 'bracket', 'brain', 'brand', 'brass', 'brave',
  'bread', 'breeze', 'brick', 'bridge', 'brief', 'bright', 'bring', 'brisk', 'broccoli', 'broken',
  'bronze', 'broom', 'brother', 'brown', 'brush', 'bubble', 'buddy', 'budget', 'buffalo', 'build',
  'bulb', 'bulk', 'bullet', 'bundle', 'bunker', 'burden', 'burger', 'burst', 'bus', 'business',
  'busy', 'butter', 'button', 'buy', 'buyer', 'buzz', 'cabbage', 'cabin', 'cable', 'cactus',
  'cage', 'cake', 'call', 'calm', 'camera', 'camp', 'can', 'canal', 'cancel', 'candy',
  'cannon', 'canoe', 'canvas', 'canyon', 'capable', 'capital', 'captain', 'car', 'carbon', 'card',
  'cargo', 'carpet', 'carrot', 'carry', 'cart', 'case', 'cash', 'casino', 'castle', 'casual',
  'cat', 'catalog', 'catch', 'category', 'cattle', 'caught', 'cause', 'caution', 'cave', 'ceiling',
  'celery', 'cement', 'census', 'century', 'cereal', 'certain', 'chair', 'chalk', 'champion', 'change',
  'chaos', 'chapter', 'charge', 'chase', 'chat', 'cheap', 'check', 'cheese', 'chef', 'cherry',
  'chest', 'chicken', 'chief', 'child', 'chimney', 'choice', 'choose', 'chronic', 'chuckle', 'chunk',
  'churn', 'cigar', 'cinnamon', 'circle', 'citizen', 'city', 'civil', 'claim', 'clap', 'clarify',
  'claw', 'clay', 'clean', 'clerk', 'clever', 'click', 'client', 'cliff', 'climb', 'clinic',
  'clip', 'clock', 'clog', 'close', 'cloth', 'cloud', 'clown', 'club', 'clue', 'cluster',
  'clutch', 'coach', 'coast', 'coconut', 'code', 'coffee', 'coil', 'coin', 'collect', 'color',
  'column', 'combine', 'comfort', 'comic', 'common', 'company', 'concert', 'conduct', 'confirm', 'congress',
  'connect', 'consider', 'control', 'convince', 'cook', 'cool', 'copper', 'copy', 'coral', 'core',
  'corn', 'correct', 'cost', 'cotton', 'couch', 'country', 'couple', 'course', 'cousin', 'cover',
  'coyote', 'crack', 'cradle', 'craft', 'cram', 'crane', 'crash', 'crate', 'crawl', 'crazy',
  'cream', 'credit', 'creek', 'crew', 'cricket', 'crime', 'crisp', 'critic', 'crop', 'cross',
  'crouch', 'crowd', 'crucial', 'cruel', 'cruise', 'crumble', 'crunch', 'crush', 'cry', 'crystal',
  'cube', 'culture', 'cup', 'cupboard', 'curious', 'current', 'curtain', 'curve', 'cushion', 'custom',
  'customer', 'cut', 'cute', 'cycle', 'dad', 'damage', 'damp', 'dance', 'danger', 'daring',
  'dash', 'daughter', 'dawn', 'day', 'deal', 'debate', 'debris', 'decade', 'december', 'decide',
  'decline', 'decorate', 'decrease', 'deer', 'defense', 'define', 'defy', 'degree', 'delay', 'deliver',
  'demand', 'demise', 'denial', 'dentist', 'deny', 'depart', 'depend', 'deposit', 'depth', 'deputy',
  'derive', 'describe', 'desert', 'design', 'desk', 'despair', 'destroy', 'detail', 'detect', 'develop',
  'device', 'devote', 'diagram', 'dial', 'diamond', 'diary', 'dice', 'diesel', 'diet', 'differ',
  'digital', 'dignity', 'dilemma', 'dinner', 'dinosaur', 'direct', 'dirt', 'disagree', 'discover', 'disease',
  'dish', 'dismiss', 'disorder', 'display', 'distance', 'divert', 'divide', 'divorce', 'dizzy', 'doctor',
  'document', 'dog', 'doll', 'dolphin', 'domain', 'donate', 'donkey', 'donor', 'door', 'dose',
  'double', 'doubt', 'dove', 'down', 'dozen', 'draft', 'dragon', 'drama', 'drastic', 'draw',
  'dream', 'dress', 'drift', 'drill', 'drink', 'drip', 'drive', 'drop', 'drug', 'drum',
  'dry', 'duck', 'dumb', 'dune', 'during', 'dust', 'dutch', 'duty', 'dwarf', 'dynamic',
  'eager', 'eagle', 'early', 'earn', 'earth', 'easily', 'east', 'easy', 'echo', 'ecology',
  'economy', 'edge', 'edit', 'educate', 'effort', 'egg', 'eight', 'either', 'elbow', 'elder',
  'electric', 'elegant', 'element', 'elephant', 'elevator', 'elite', 'else', 'embark', 'embody', 'embrace',
  'emerge', 'emotion', 'employ', 'empower', 'empty', 'enable', 'enact', 'end', 'endless', 'endorse',
  'enemy', 'energy', 'enforce', 'engage', 'engine', 'enhance', 'enjoy', 'enlist', 'enough', 'enrich',
  'enroll', 'ensure', 'enter', 'entire', 'entry', 'envelope', 'episode', 'equal', 'equip', 'era',
  'erase', 'erupt', 'escape', 'essay', 'essence', 'estate', 'eternal', 'ethics', 'evidence', 'evil',
  'evoke', 'evolve', 'exact', 'example', 'excess', 'exchange', 'excite', 'exclude', 'excuse', 'execute',
  'exercise', 'exhaust', 'exhibit', 'exile', 'exist', 'exit', 'exotic', 'expand', 'expect', 'expire',
  'explain', 'expose', 'express', 'extend', 'extra', 'eye', 'eyebrow', 'fabric', 'face', 'faculty',
  'fade', 'faint', 'faith', 'fall', 'false', 'fame', 'family', 'famous', 'fan', 'fancy',
  'fantasy', 'farm', 'fashion', 'fat', 'fatal', 'father', 'fatigue', 'fault', 'favorite', 'feature',
  'february', 'federal', 'fee', 'feed', 'feel', 'female', 'fence', 'festival', 'fetch', 'fever',
  'few', 'fiber', 'fiction', 'field', 'figure', 'file', 'film', 'filter', 'final', 'find',
  'fine', 'finger', 'finish', 'fire', 'firm', 'first', 'fish', 'fit', 'five', 'fix',
  'flag', 'flame', 'flash', 'flat', 'flavor', 'flee', 'flight', 'flip', 'float', 'flock',
  'floor', 'flower', 'fluid', 'flush', 'fly', 'foam', 'focus', 'fog', 'foil', 'fold',
  'follow', 'food', 'foot', 'force', 'forest', 'forget', 'fork', 'fortune', 'forum', 'forward',
  'fossil', 'foster', 'found', 'fox', 'fragile', 'frame', 'franchise', 'frank', 'freeze', 'fresh',
  'friend', 'fridge', 'frog', 'front', 'frost', 'frown', 'frozen', 'fruit', 'fuel', 'full',
  'fun', 'funny', 'furnace', 'future', 'gadget', 'gain', 'galaxy', 'gallery', 'game', 'gap',
  'garage', 'garbage', 'garden', 'garlic', 'gas', 'gasp', 'gate', 'gather', 'gauge', 'gaze',
  'general', 'genius', 'genre', 'gentle', 'genuine', 'gesture', 'ghost', 'giant', 'gift', 'giggle',
  'girl', 'give', 'glad', 'glance', 'glare', 'glass', 'glide', 'glimpse', 'globe', 'gloom',
  'glory', 'glove', 'glow', 'glue', 'goat', 'go', 'goal', 'god', 'gold', 'golf',
  'good', 'goose', 'gorilla', 'gospel', 'gossip', 'govern', 'gown', 'grab', 'grace', 'grain',
  'grand', 'grant', 'grape', 'grass', 'gravity', 'gray', 'great', 'green', 'grid', 'grief',
  'grit', 'grocery', 'group', 'grow', 'grunt', 'guarantee', 'guard', 'guess', 'guide', 'guilt',
  'guitar', 'gun', 'gym', 'habit', 'hair', 'half', 'hammer', 'hamster', 'hand', 'happy',
  'harbor', 'hard', 'hardware', 'harm', 'harvest', 'hat', 'have', 'hawk', 'hazard', 'head',
  'health', 'heart', 'heat', 'heavy', 'hedgehog', 'height', 'hello', 'helmet', 'help', 'hen',
  'hero', 'hidden', 'high', 'hill', 'hint', 'hip', 'hire', 'history', 'hobby', 'hockey',
  'hold', 'hole', 'holiday', 'home', 'honey', 'hood', 'hope', 'horn', 'horse', 'hospital',
  'host', 'hotel', 'hour', 'house', 'hover', 'how', 'huge', 'human', 'humble', 'humor',
  'hunt', 'hurdle', 'hurry', 'hurt', 'husband', 'hybrid', 'ice', 'icon', 'idea', 'identify',
  'idle', 'ignore', 'ill', 'illegal', 'illness', 'image', 'imitate', 'immense', 'immune', 'impact',
  'impose', 'improve', 'impulse', 'inch', 'include', 'income', 'increase', 'index', 'indicate', 'indoor',
  'industry', 'infant', 'inflict', 'inform', 'inner', 'innocent', 'input', 'inquiry', 'insane', 'insect',
  'inside', 'inspire', 'install', 'instruct', 'instrument', 'insurance', 'intend', 'integer', 'integrate', 'intentional',
  'interest', 'interface', 'internal', 'international', 'interview', 'into', 'invest', 'invite', 'involve', 'iron',
  'island', 'isolate', 'issue', 'item', 'jacket', 'jaguar', 'jar', 'jazz', 'jealous', 'jeans',
  'jelly', 'jewel', 'job', 'join', 'joke', 'journey', 'joy', 'judge', 'juice', 'jump',
  'jungle', 'junior', 'junk', 'just', 'kangaroo', 'keen', 'keep', 'ketchup', 'key', 'kick',
  'kid', 'kidney', 'kind', 'kingdom', 'kiss', 'kit', 'kitchen', 'kite', 'kitten', 'kiwi',
  'knee', 'knife', 'knock', 'know', 'knowledge', 'koala', 'laboratory', 'ladder', 'lady', 'lake',
  'lamp', 'language', 'laptop', 'large', 'laser', 'later', 'latin', 'laugh', 'laundry', 'lava',
  'law', 'lawn', 'lawsuit', 'layer', 'lazy', 'leader', 'leaf', 'learn', 'leave', 'lecture',
  'left', 'leg', 'legal', 'legend', 'leisure', 'lemon', 'lend', 'length', 'lens', 'leopard',
  'lesson', 'letter', 'level', 'liar', 'liberty', 'library', 'license', 'life', 'lift', 'light',
  'like', 'limb', 'limit', 'link', 'lion', 'liquid', 'list', 'little', 'live', 'lizard',
  'load', 'loan', 'lobster', 'local', 'lock', 'logic', 'lonely', 'long', 'loop', 'lottery',
  'loud', 'lounge', 'love', 'loyal', 'lucky', 'luggage', 'lumber', 'lunar', 'lunch', 'lung',
  'luxury', 'lyrics', 'machine', 'mad', 'magic', 'magnet', 'maid', 'mail', 'main', 'major',
  'make', 'mammal', 'man', 'manage', 'mango', 'mansion', 'manual', 'maple', 'marble', 'march',
  'margin', 'marine', 'market', 'marriage', 'mask', 'mass', 'master', 'match', 'material', 'math',
  'matrix', 'matter', 'maximum', 'maze', 'meadow', 'mean', 'measure', 'meat', 'mechanic', 'medal',
  'media', 'melody', 'melt', 'member', 'memory', 'mention', 'menu', 'mercy', 'merge', 'merit',
  'merry', 'mesh', 'message', 'metal', 'method', 'metro', 'microphone', 'middle', 'midnight', 'milk',
  'million', 'mimic', 'mind', 'minimum', 'minor', 'minute', 'miracle', 'mirror', 'misery', 'miss',
  'mistake', 'mix', 'mixed', 'mixture', 'mobile', 'model', 'modify', 'mom', 'moment', 'monitor',
  'monkey', 'monster', 'month', 'moon', 'moral', 'more', 'morning', 'mosquito', 'mother', 'motion',
  'motor', 'mountain', 'mouse', 'move', 'movie', 'much', 'mud', 'muffin', 'mule', 'multiply',
  'muscle', 'museum', 'mushroom', 'music', 'must', 'mutual', 'myself', 'mystery', 'myth', 'naive',
  'name', 'napkin', 'narrow', 'nasty', 'nation', 'nature', 'near', 'neck', 'need', 'negative',
  'neglect', 'neither', 'nephew', 'nerve', 'nest', 'net', 'network', 'neutral', 'never', 'news',
  'next', 'nice', 'night', 'noble', 'noise', 'nominee', 'noodle', 'north', 'nose', 'notable',
  'note', 'nothing', 'notice', 'novel', 'now', 'nuclear', 'number', 'nurse', 'nut', 'oak',
  'obey', 'object', 'oblige', 'obscure', 'observe', 'obtain', 'obvious', 'occur', 'ocean', 'october',
  'odor', 'off', 'offer', 'office', 'often', 'oil', 'okay', 'old', 'olive', 'olympic',
  'omit', 'once', 'one', 'onion', 'online', 'only', 'open', 'opera', 'opinion', 'oppose',
  'option', 'orange', 'orbit', 'order', 'ordinary', 'organ', 'orient', 'original', 'orphan', 'ostrich',
  'other', 'outdoor', 'outer', 'output', 'outside', 'oval', 'oven', 'over', 'own', 'owner',
  'oxygen', 'pack', 'package', 'page', 'pain', 'paint', 'pair', 'palace', 'palm', 'panda',
  'panel', 'panic', 'panther', 'paper', 'parade', 'parent', 'park', 'parrot', 'party', 'pass',
  'password', 'pasta', 'paste', 'path', 'patient', 'patrol', 'pattern', 'pause', 'pave', 'payment',
  'peace', 'peanut', 'pear', 'peasant', 'pebble', 'pedal', 'peer', 'pen', 'penalty', 'pencil',
  'people', 'pepper', 'perfect', 'permit', 'person', 'pet', 'phone', 'photo', 'phrase', 'physical',
  'piano', 'picnic', 'picture', 'piece', 'pig', 'pigeon', 'pill', 'pilot', 'pink', 'pioneer',
  'pipe', 'pistol', 'pitch', 'pizza', 'place', 'planet', 'plastic', 'plate', 'play', 'please',
  'pledge', 'pluck', 'plug', 'plunge', 'poem', 'poet', 'point', 'polar', 'police', 'policy',
  'polish', 'pond', 'pool', 'popular', 'portion', 'position', 'positive', 'possible', 'post', 'potato',
  'pottery', 'poverty', 'powder', 'power', 'practice', 'praise', 'pray', 'preach', 'precede', 'precise',
  'predict', 'prefer', 'prepare', 'present', 'pretty', 'prevent', 'price', 'pride', 'primary', 'print',
  'prior', 'prison', 'private', 'prize', 'problem', 'process', 'produce', 'profit', 'program', 'project',
  'promote', 'proof', 'property', 'propose', 'protect', 'proud', 'provide', 'public', 'pudding', 'pull',
  'pulp', 'pulse', 'pumpkin', 'punch', 'pupil', 'puppy', 'purchase', 'purity', 'purpose', 'purse',
  'push', 'put', 'puzzle', 'pyramid', 'quality', 'quantum', 'quarter', 'question', 'quick', 'quit',
  'quiz', 'quote', 'rabbit', 'race', 'rack', 'radar', 'radio', 'rail', 'rain', 'raise',
  'random', 'range', 'rank', 'rapid', 'rare', 'rate', 'rather', 'raven', 'raw', 'razor',
  'ready', 'real', 'reason', 'rebel', 'recall', 'receive', 'recipe', 'record', 'recycle', 'reduce',
  'reflect', 'reform', 'refuse', 'region', 'regret', 'regular', 'reject', 'relate', 'relax', 'release',
  'rely', 'remain', 'remember', 'remind', 'remove', 'render', 'renew', 'rent', 'reopen', 'repair',
  'repeat', 'replace', 'report', 'require', 'rescue', 'resemble', 'resist', 'resource', 'respect', 'respond',
  'result', 'retire', 'retreat', 'reveal', 'review', 'reward', 'rhythm', 'rib', 'ribbon', 'rice',
  'rich', 'ride', 'ridge', 'rifle', 'right', 'rigid', 'ring', 'riot', 'ripple', 'risk',
  'ritual', 'rival', 'river', 'road', 'roast', 'robot', 'robust', 'rocket', 'romance', 'roof',
  'room', 'rose', 'rotate', 'rough', 'round', 'route', 'royal', 'rubber', 'rude', 'rug',
  'rule', 'run', 'runway', 'rural', 'sad', 'saddle', 'sadness', 'safe', 'sail', 'salad',
  'salmon', 'salt', 'salute', 'same', 'sample', 'sand', 'satisfy', 'satoshi', 'sauce', 'sausage',
  'save', 'say', 'scale', 'scan', 'scare', 'scatter', 'scene', 'scheme', 'school', 'science',
  'scissors', 'scorpion', 'scout', 'scrap', 'screen', 'script', 'scrub', 'sea', 'search', 'season',
  'seat', 'second', 'secret', 'section', 'security', 'seed', 'seek', 'segment', 'select', 'sell',
  'seminar', 'senior', 'sense', 'sentence', 'separate', 'serious', 'service', 'session', 'settle', 'setup',
  'seven', 'shadow', 'shaft', 'shallow', 'share', 'shed', 'shell', 'sheriff', 'shield', 'shift',
  'shine', 'ship', 'shirt', 'shock', 'shoe', 'shoot', 'shop', 'short', 'shoulder', 'shove',
  'show', 'shrimp', 'shrug', 'shuffle', 'shy', 'sibling', 'sick', 'side', 'siege', 'sight',
  'sign', 'silent', 'silk', 'silly', 'silver', 'similar', 'simple', 'since', 'sing', 'siren',
  'sister', 'situate', 'six', 'size', 'skate', 'sketch', 'ski', 'skill', 'skin', 'skirt',
  'skull', 'slab', 'slam', 'sleep', 'slender', 'slice', 'slide', 'slim', 'slogan', 'slot',
  'slow', 'slush', 'small', 'smart', 'smile', 'smoke', 'smooth', 'snack', 'snake', 'snap',
  'sniff', 'snow', 'soap', 'soccer', 'social', 'sock', 'soda', 'soft', 'soil', 'soldier',
  'solid', 'solution', 'solve', 'some', 'son', 'song', 'soon', 'sorry', 'sort', 'soul',
  'sound', 'soup', 'source', 'south', 'space', 'spare', 'speak', 'special', 'speed', 'spell',
  'spend', 'sphere', 'spice', 'spider', 'spike', 'spin', 'spirit', 'split', 'spoil', 'sponsor',
  'spoon', 'sport', 'spot', 'spray', 'spread', 'spring', 'spy', 'square', 'squeeze', 'squirrel',
  'stable', 'stadium', 'staff', 'stage', 'stairs', 'stamp', 'stand', 'start', 'state', 'stay',
  'steak', 'steal', 'steam', 'steel', 'stem', 'step', 'stereo', 'stick', 'still', 'sting',
  'stock', 'stomach', 'stone', 'stool', 'story', 'stove', 'strategy', 'street', 'strike', 'strong',
  'struggle', 'student', 'stuff', 'stumble', 'style', 'subject', 'submit', 'subway', 'success', 'such',
  'sudden', 'suffer', 'sugar', 'suggest', 'suit', 'summer', 'sun', 'sunny', 'sunset', 'super',
  'supply', 'supreme', 'sure', 'surface', 'surge', 'surprise', 'surround', 'survey', 'suspect', 'sustain',
  'swallow', 'swamp', 'swap', 'swarm', 'swear', 'sweat', 'sweet', 'swift', 'swim', 'swing',
  'switch', 'sword', 'symbol', 'symptom', 'system', 'table', 'tackle', 'tag', 'tail', 'talent',
  'talk', 'tank', 'tape', 'target', 'task', 'taste', 'tattoo', 'taxi', 'teach', 'team',
  'tell', 'temple', 'tend', 'ten', 'tenant', 'tennis', 'tent', 'term', 'test', 'text',
  'thank', 'that', 'theme', 'then', 'theory', 'there', 'they', 'thing', 'this', 'thought',
  'three', 'thrive', 'throw', 'thumb', 'thunder', 'ticket', 'tide', 'tiger', 'tilt', 'timber',
  'time', 'tiny', 'tip', 'tired', 'tissue', 'title', 'toast', 'tobacco', 'today', 'toddler',
  'toe', 'together', 'toilet', 'token', 'tomato', 'tomorrow', 'tone', 'tongue', 'tonight', 'tool',
  'tooth', 'top', 'topic', 'topple', 'torch', 'tornado', 'torpedo', 'tortoise', 'toss', 'total',
  'tourist', 'toward', 'tower', 'town', 'toy', 'track', 'trade', 'traffic', 'tragic', 'train',
  'transfer', 'trap', 'trash', 'travel', 'tray', 'treat', 'tree', 'trend', 'trial', 'tribe',
  'trick', 'trigger', 'trim', 'trip', 'trophy', 'trouble', 'truck', 'true', 'truly', 'trumpet',
  'trust', 'truth', 'try', 'tube', 'tuition', 'tumble', 'tuna', 'tunnel', 'turkey', 'turn',
  'turtle', 'twelve', 'twenty', 'twice', 'twin', 'twist', 'two', 'type', 'typical', 'ugly',
  'umbrella', 'unable', 'unaware', 'uncle', 'uncover', 'under', 'undo', 'unfair', 'unfold', 'unhappy',
  'uniform', 'unique', 'unit', 'universe', 'unknown', 'unlock', 'until', 'unusual', 'unveil', 'update',
  'upgrade', 'uphold', 'upon', 'upper', 'upset', 'urban', 'urge', 'usage', 'use', 'used',
  'useful', 'useless', 'usual', 'utility', 'vacant', 'vacuum', 'vague', 'valid', 'valley', 'valve',
  'van', 'vanish', 'vapor', 'various', 'vast', 'vault', 'vehicle', 'velvet', 'vendor', 'venture',
  'verb', 'vertical', 'very', 'vessel', 'veteran', 'viable', 'vibrant', 'vicious', 'victory', 'video',
  'view', 'village', 'vintage', 'violin', 'virtual', 'virus', 'visa', 'visit', 'visual', 'vital',
  'vivid', 'vocal', 'voice', 'void', 'volcano', 'volume', 'vote', 'voyage', 'wage', 'wagon',
  'wait', 'walk', 'wall', 'walnut', 'want', 'warfare', 'warm', 'warrior', 'wash', 'waste',
  'water', 'wave', 'way', 'wealth', 'weapon', 'wear', 'weasel', 'weather', 'web', 'wedding',
  'weekend', 'weird', 'welcome', 'west', 'wet', 'whale', 'what', 'wheat', 'wheel', 'when',
  'where', 'whip', 'whisper', 'wide', 'width', 'wife', 'wild', 'will', 'win', 'window',
  'wine', 'wing', 'wink', 'winner', 'winter', 'wire', 'wisdom', 'wise', 'wish', 'witness',
  'wolf', 'woman', 'wonder', 'wood', 'wool', 'word', 'work', 'world', 'worry', 'worth',
  'wrap', 'wreck', 'wrestle', 'wrist', 'write', 'wrong', 'yard', 'year', 'yellow', 'young',
  'youth', 'zebra', 'zero', 'zone', 'zoo'
];

const GettingStartedSection = () => {
  useScrollTop();
  const [isFullyRead, setIsFullyRead] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showQuiz, setShowQuiz] = useState(false);
  const { updateProgress } = useProgress();
  const { toast } = useToast();

  const [seedPhrase, setSeedPhrase] = useState<string[]>([]);
  const [showSeedPhrase, setShowSeedPhrase] = useState(true);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentWordInput, setCurrentWordInput] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [isSeedPhraseVerified, setIsSeedPhraseVerified] = useState(false);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);


  useEffect(() => {
    const generateSeedPhrase = () => {
      const phrase = [];
      for (let i = 0; i < 12; i++) {
        const randomIndex = Math.floor(Math.random() * SEED_WORD_LIST.length);
        phrase.push(SEED_WORD_LIST[randomIndex]);
      }
      setSeedPhrase(phrase);
    };

    generateSeedPhrase();
  }, []);

  const handleWordVerification = () => {
    if (currentWordInput.toLowerCase() === seedPhrase[currentWordIndex].toLowerCase()) {
      if (currentWordIndex === 11) {
        setIsSeedPhraseVerified(true);
        setIsVerifying(false);
        toast({
          title: "Congratulations!",
          description: "You've successfully verified your seed phrase. Keep it safe!",
          variant: "default"
        });
      } else {
        setCurrentWordIndex(prev => prev + 1);
        setCurrentWordInput('');
        toast({
          title: "Correct!",
          description: `Word ${currentWordIndex + 1} verified. ${11 - currentWordIndex} words remaining.`,
          variant: "default"
        });
      }
    } else {
      toast({
        title: "Incorrect Word",
        description: "Please try again with the correct word.",
        variant: "destructive"
      });
      setCurrentWordInput('');
    }
  };

  useEffect(() => {
    const forceScrollTop = () => {
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    };

    forceScrollTop();
    setTimeout(forceScrollTop, 0);
    requestAnimationFrame(() => {
      forceScrollTop();
      requestAnimationFrame(forceScrollTop);
    });
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrollPercent = (scrollTop / scrollHeight) * 100;
      setScrollProgress(scrollPercent);

      if (scrollPercent > 95) {
        setIsFullyRead(true);
        updateProgress(1, 'getting-started', true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [updateProgress]);

  interface ResourceCardProps {
    icon: LucideIcon;
    title: string;
    description: string;
    tags: string[];
    color: string;
  }

  const ResourceCard = ({ icon: Icon, title, description, tags, color }: ResourceCardProps) => (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className={`bg-white rounded-xl shadow-lg p-6 border-l-4 ${color}`}
    >
      <div className="flex items-start space-x-4">
        <div className={`p3 rounded-lg ${color.replace('border-', 'bg-').replace('-500', '-100')}`}>
          <Icon className={`w-6 h-6 ${color.replace('border-', 'text-')}`} />
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-lg mb-2">{title}</h3>
          <p className="text-gray-600 mb-3">{description}</p>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag, index) => (
              <span
                key={index}
                className={`px-2 py-1 rounded-full text-sm ${color.replace('border-', 'bg-').replace('-500', '-100')} ${color.replace('border-', 'text-')}`}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );

  const questions = [
    {
      question: "What is a seed phrase primarily used for in cryptocurrency?",
      options: [
        "To speed up transactions on the blockchain",
        "To recover and access your wallet on any device",
        "To mine new cryptocurrencies",
        "To encrypt your email communications"
      ],
      correctAnswer: 1,
      explanation: "A seed phrase is a crucial backup mechanism that allows you to recover and access your cryptocurrency wallet on any device. It's essentially your master key to your digital assets."
    },
    {
      question: "Which of the following is the most secure way to store your seed phrase?",
      options: [
        "Take a screenshot and store it in cloud storage",
        "Write it down on paper and store it in a secure location",
        "Save it as a note on your smartphone",
        "Share it with a trusted friend as backup"
      ],
      correctAnswer: 1,
      explanation: "Writing down your seed phrase on paper and storing it in a secure location is the safest method. Digital storage methods are vulnerable to hacking, and sharing your seed phrase with others puts your assets at risk."
    },
    {
      question: "What should you do if someone asks for your seed phrase online?",
      options: [
        "Share it if they work for the wallet company",
        "Provide it if they can verify their identity",
        "Never share it with anyone under any circumstances",
        "Share it only in encrypted format"
      ],
      correctAnswer: 2,
      explanation: "You should never share your seed phrase with anyone, regardless of who they claim to be. Legitimate companies and support staff will never ask for your seed phrase."
    },
    {
      question: "How many words typically make up a seed phrase?",
      options: [
        "8 words",
        "12 or 24 words",
        "16 words",
        "32 words"
      ],
      correctAnswer: 1,
      explanation: "Seed phrases typically consist of either 12 or 24 words, with 12 being the most common. This provides sufficient security while remaining manageable for users to record and store safely."
    },
    {
      question: "What happens if you lose both your seed phrase and access to your wallet?",
      options: [
        "Contact support to reset your wallet",
        "Your funds are permanently lost",
        "Use your email to recover access",
        "Wait 30 days for automatic recovery"
      ],
      correctAnswer: 1,
      explanation: "If you lose both your seed phrase and access to your wallet, your funds are permanently lost. There is no way to recover access without the seed phrase - this is why keeping it secure is crucial."
    }
  ];

  const handleAnswerSelect = (answerIndex: number) => {
    if (showExplanation || selectedAnswer !== null) return;

    setSelectedAnswer(answerIndex.toString());
    const correct = answerIndex === questions[currentQuestionIndex].correctAnswer;
    setIsCorrect(correct);
    setShowExplanation(true);

    setTimeout(() => {
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(prev => prev + 1);
        setShowExplanation(false);
        setSelectedAnswer(null);
      } else {
        setQuizCompleted(true);
        setTimeout(() => {
          window.location.href = '/modules/module1/quiz';
        }, 5000); // Changed from 3000 to 5000
      }
    }, 5000); // Changed from 3000 to 5000
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="fixed top-0 left-0 w-full h-1 bg-gray-300 z-50">
        <div
          className="h-full bg-blue-600"
          style={{ width: `${scrollProgress}%` }}
        ></div>
      </div>

      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <Link href="/modules/module1">
            <Button variant="ghost" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Module Overview
            </Button>
          </Link>
        </div>

        <Card className="mb-8">
          <CardContent className="p-6 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 text-white rounded-t-lg">
            <h1 className="text-4xl font-bold mb-2">
              Getting Started with Cryptocurrency
            </h1>
            <p className="text-blue-100">
              Master the essential concepts and best practices for safely entering the world of digital assets
            </p>
          </CardContent>
        </Card>

        {!isSeedPhraseVerified && (
          <Card className="mb-8">
            <CardContent className="p-6">
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-8 border-2 border-blue-100 shadow-lg">
                <div className="flex items-start gap-6">
                  <div className="bg-blue-500 rounded-full p-4 shadow-lg">
                    <Shield className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-blue-800 mb-6 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                      Your Crypto Wallet Security Setup - Important First Steps
                    </h2>

                    <div className="space-y-6">
                      <div className="bg-yellow-50 p-6 rounded-xl border-l-4 border-yellow-400 shadow-md">
                        <h3 className="font-semibold text-yellow-800 text-xl flex items-center gap-2">
                          <Key className="w-5 h-5" />
                          What is a Seed Phrase?
                        </h3>
                        <p className="text-yellow-700 mt-3">
                          Think of a seed phrase as the master key to your crypto wallet - it's like the password
                          that gives access to all your cryptocurrency. It's a sequence of 12 simple words that can
                          restore your wallet if you:
                        </p>
                        <ul className="list-none mt-4 space-y-2">
                          {[
                            'Lose access to your device',
                            'Forget your wallet password',
                            'Need to move your wallet to a new device'
                          ].map((item, index) => (
                            <li key={index} className="flex items-center gap-2 text-yellow-700">
                              <div className="w-1.5 h-1.5 rounded-full bg-yellow-500"></div>
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {!isVerifying ? (
                        <>
                          <div className="bg-green-50 p-6 rounded-xl border-l-4 border-green-400 shadow-md">
                            <h3 className="font-semibold text-green-800 text-xl flex items-center gap-2">
                              <CheckCircle2 className="w-5 h-5" />
                              How to Safely Store Your Seed Phrase
                            </h3>
                            <div className="space-y-4 mt-3 text-green-700">
                              <p>Follow these steps carefully:</p>
                              <ol className="list-none space-y-3">
                                {[
                                  'Get a piece of paper and a pen ready (don\'t take a screenshot or type it)',
                                  'Write down each word exactly as shown, including the number',
                                  'Double-check your spelling - even small mistakes matter',
                                  'Store this paper in a secure, private location',
                                  'Consider making a backup copy stored in a different secure location'
                                ].map((step, index) => (
                                  <li key={index} className="flex items-start gap-3">
                                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-100 flex items-center justify-center text-green-600 font-semibold">
                                      {index + 1}
                                    </div>
                                    <span>{step}</span>
                                  </li>
                                ))}
                              </ol>
                            </div>
                          </div>

                          <div className="bg-gradient-to-br from-red-50 to-pink-50 p-6 rounded-xl border-l-4 border-red-400 shadow-md">
                            <h3 className="font-semibold text-red-800 text-xl flex items-center gap-2">
                              <XCircle className="w-5 h-5" />
                              Never Do These Things
                            </h3>
                            <ul className="mt-3 space-y-2">
                              {[
                                'Take screenshots of your seed phrase',
                                'Store it in cloud storage or digital notes',
                                'Share it with anyone, even support staff',
                                'Enter it on websites or forms',
                                'Send it through email or messages'
                              ].map((warning, index) => (
                                <li key={index} className="flex items-center gap-2 text-red-700">
                                  <div className="w-1.5 h-1.5 rounded-full bg-red-500"></div>
                                  {warning}
                                </li>
                              ))}
                            </ul>
                          </div>
                          <p className="text-blue-700 mb-4">
                            Below is your unique 12-word seed phrase. Write these words down in order:
                          </p>

                          <div className="bg-white p-4 rounded-lg mb-4">
                            <div className="flex justify-between items-center mb-4">
                              <span className="text-blue-800 font-semibold">Your Seed Phrase:</span>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => setShowSeedPhrase(!showSeedPhrase)}
                              >
                                {showSeedPhrase ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                              </Button>
                            </div>

                            {showSeedPhrase ? (
                              <div className="grid grid-cols-3 gap-4">
                                {seedPhrase.map((word, index) => (
                                  <div key={index} className="bg-blue-50 p-2 rounded">
                                    <span className="text-blue-600 mr-2">{index + 1}.</span>
                                    <span className="font-medium">{word}</span>
                                  </div>
                                ))}
                              </div>
                            ) : (
                              <div className="text-center py-8 text-gray-500">
                                ••• Hidden for security •••
                              </div>
                            )}
                          </div>

                          <div className="bg-blue-100 p-4 rounded-lg mb-4">
                            <p className="text-blue-800 font-medium">
                              ✍️ After you've written down your seed phrase, click the button below.
                              You'll be asked to verify a few words to make sure you've recorded them correctly.
                            </p>
                          </div>

                          <Button
                            onClick={() => {
                              window.scrollTo({ top: 0, behavior: 'smooth' });
                              setIsVerifying(true);
                            }}
                            className="w-full"
                          >
                            I've Written Down My Seed Phrase Safely
                          </Button>
                        </>
                      ) : (
                        <div className="space-y-4">
                          <div className="bg-blue-100 p-4 rounded-lg">
                            <p className="text-blue-800 font-medium">
                              Let's verify that you've written down your seed phrase correctly.
                              Enter word #{currentWordIndex + 1} from your written copy:
                            </p>
                            <p className="text-sm text-blue-600 mt-2">
                              Don't try to copy-paste or look at the screen - use your written backup!
                            </p>
                          </div>

                          <div className="flex gap-2">
                            <Input
                              type="text"
                              value={currentWordInput}
                              onChange={(e) => setCurrentWordInput(e.target.value)}
                              placeholder={`Enter word #${currentWordIndex + 1}`}
                              className="flex-1"
                              onKeyPress={(e) => {
                                if (e.key === 'Enter' && currentWordInput) {
                                  handleWordVerification();
                                }
                              }}
                            />
                            <Button
                              onClick={handleWordVerification}
                              disabled={!currentWordInput}
                            >
                              Verify
                            </Button>
                          </div>

                          <div className="mt-4">
                            <div className="flex justify-between mb-2">
                              <span className="text-sm text-blue-600">Verification Progress</span>
                              <span className="text-sm text-blue-600">
                                {currentWordIndex}/12 words verified
                              </span>
                            </div>
                            <Progress value={(currentWordIndex / 12) * 100} />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        <Card className="mb-6">
          <CardContent className="prose max-w-none p-6">
            <section>
              <h2 className="text-2xl font-bold text-blue-700">First Steps</h2>
              <div className="flex items-center gap-4 mb-4">
                <SecurityIcon size={32} className="text-blue-600" />
                <p className="text-gray-700">
                  Think of cryptocurrency as a new language - it takes time to learn, but with the right guidance,
                  anyone can understand it. This guide will walk you through your first steps, just like having
                  a friendly mentor by your side.
                </p>
              </div>

              <GettingStartedDiagram />

              <div className="bg-blue-50 p-4 rounded-lg mb-6">
                <h3 className="text-xl font-semibold text-blue-800 mb-2">Beginner's Checklist 🎯</h3>
                <ul className="list-disc pl-5 space-y-2 text-gray-700">
                  <li>
                    <strong>Learn the Basics:</strong> Just like learning to drive, start by understanding
                    how things work before getting behind the wheel
                  </li>
                  <li>
                    <strong>Choose Trusted Tools:</strong> Pick well-known exchanges and wallets, like
                    choosing a bank for your traditional money
                  </li>
                  <li>
                    <strong>Practice Safety:</strong> Think of security like locking your house - it's
                    essential to protect your digital assets
                  </li>
                  <li>
                    <strong>Start Small:</strong> Begin with small amounts while you're learning,
                    like using training wheels when learning to ride a bike
                  </li>
                  <li>
                    <strong>Keep Records:</strong> Track your transactions like you would track expenses
                    in your regular budget
                  </li>
                </ul>
              </div>

              <div className="bg-yellow-50 p-4 rounded-lg mb-6">
                <p className="text-yellow-800 font-semibold">
                  💡 Pro Tip: Don't feel pressured to invest right away. It's okay to spend time learning
                  and observing. Many successful crypto users spent months learning before making their first transaction.
                </p>
              </div>
            </section>

            <section className="mt-8">
              <h2 className="text-2xl font-bold text-blue-700">Security Best Practices</h2>
              <div className="flex items-center gap-4 mb-4">
                <WalletIcon size={32} className="text-blue-600" />
                <p className="text-gray-700">
                  Think of cryptocurrency security like protecting your home - you need multiple layers of protection.
                  Here's how to keep your digital assets safe:
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg border border-gray-200 mb-6">
                <ul className="list-disc pl-5 space-y-4 text-gray-700">
                  <li>
                    <strong>Strong Passwords:</strong> Use unique, complex passwords for each account.
                    Think: "MyFirst#Crypto2024!" instead of "password123"
                  </li>
                  <li>
                    <strong>Two-Factor Authentication (2FA):</strong> It's like having both a key and an alarm
                    code for your house - even if someone gets your password, they can't get in without the second factor
                  </li>
                  <li>
                    <strong>Secure Storage:</strong> Keep your private keys and recovery phrases as safe as you'd
                    keep your passport or birth certificate
                  </li>
                  <li>
                    <strong>Hardware Wallets:</strong> For larger amounts, use a hardware wallet - it's like
                    having a personal safe for your digital money
                  </li>
                  <li>
                    <strong>Phishing Awareness:</strong> Be cautious of unexpected emails or messages asking
                    about your crypto - legitimate services will never ask for your private keys
                  </li>
                  <li>
                    <strong>Regular Updates:</strong> Keep your software up-to-date, just like you'd maintain
                    your car to keep it running safely
                  </li>
                  <li>
                    <strong>Double-Check Everything:</strong> Verify all transaction details carefully - crypto
                    transactions can't be reversed like bank transfers
                  </li>
                </ul>
              </div>

              <div className="bg-red-50 p-4 rounded-lg mb-6">
                <h4 className="text-red-800 font-semibold mb-2">⚠️ Warning Signs to Watch For:</h4>
                <ul className="list-disc pl-5 space-y-2 text-gray-700">
                  <li>Anyone pressuring you to invest quickly</li>
                  <li>Promises of guaranteed returns</li>
                  <li>Requests to share your private keys or recovery phrases</li>
                  <li>Unsolicited investment advice from strangers</li>
                  <li>Websites with URLs that look slightly different from official ones</li>
                </ul>
              </div>
            </section>

            <section className="mt-8">
              <h2 className="text-2xl font-bold text-blue-700">Practical Storage Tips</h2>
              <div className="bg-yellow-50 p-6 rounded-lg mb-6">
                <h3 className="text-xl font-semibold text-yellow-800 mb-4">Essential Security Guidelines</h3>
                <div className="space-y-4">
                  <div className="bg-white p-4 rounded-lg">
                    <h4 className="font-semibold text-yellow-800 mb-2">Never Share Private Information</h4>
                    <p className="text-gray-700">
                      Your private keys and recovery phrases are like the master key to your house - never share
                      them with anyone, not even if they claim to be support staff.
                    </p>
                  </div>

                  <div className="bg-white p-4 rounded-lg">
                    <h4 className="font-semibold text-yellow-800 mb-2">Use Multiple Wallets</h4>
                    <p className="text-gray-700">
                      Consider having separate wallets for different purposes - like having a checking account
                      for daily use and a savings account for long-term storage.
                    </p>
                  </div>

                  <div className="bg-white p-4 rounded-lg">
                    <h4 className="font-semibold text-yellow-800 mb-2">Backup Everything</h4>
                    <p className="text-gray-700">
                      Store your wallet information in multiple secure locations, like keeping copies of important
                      documents in both a home safe and a bank vault.
                    </p>
                  </div>

                  <div className="bg-white p-4 rounded-lg">
                    <h4 className="font-semibold text-yellow-800 mb-2">Test Before Large Transfers</h4>
                    <p className="text-gray-700">
                      Always send a small test amount first when using a new wallet or address - think of it
                      like trying a new route before making a long journey.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <section className="mt-8">
              <div className="bg-blue-50 p-6 rounded-xl border-l-4 border-blue-400 shadow-md mt-6">
                <h3 className="font-semibold text-blue-800 text-xl flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" />
                  Getting Your First Cryptocurrency
                </h3>
                <div className="space-y-4 mt-3 text-blue-700">
                  <p>
                    Before you can start using a cryptocurrency wallet, you'll need to acquire some cryptocurrency first. The easiest and most secure way for beginners is through regulated cryptocurrency exchanges:
                  </p>

                  <div className="bg-white rounded-lg p-4">
                    <h4 className="font-medium text-blue-800 mb-2">Recommended Exchanges</h4>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-2">
                        <div className="min-w-[24px] mt-1">
                          <CheckCircle2 className="w-6 h-6 text-green-500" />
                        </div>
                        <div>
                          <span className="font-medium">Coinbase</span>
                          <p className="text-sm text-gray-600">Perfect for beginners with a user-friendly interface and strong security measures. Available in most countries.</p>
                        </div>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="min-w-[24px] mt-1">
                          <CheckCircle2 className="w-6 h-6 text-green-500" />
                        </div>
                        <div>
                          <span className="font-medium">Kraken</span>
                          <p className="text-sm text-gray-600">Known for robust security, competitive fees, and extensive cryptocurrency options. Excellent choice for both beginners and advanced users.</p>
                        </div>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-white rounded-lg p-4 mt-4">
                    <h4 className="font-medium text-blue-800 mb-2">Payment Methods</h4>
                    <div className="space-y-3">
                      <div className="flex items-start gap-2">
                        <div className="min-w-[24px] mt-1">
                          <CreditCard className="w-6 h-6 text-blue-500" />
                        </div>
                        <div>
                          <span className="font-medium">Debit Card</span>
                          <p className="text-sm text-gray-600">Fastest way to buy crypto. Purchase instantly using your debit card, though fees might be slightly higher.</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <div className="min-w-[24px] mt-1">
                          <Building2 className="w-6 h-6 text-blue-500" />
                        </div>
                        <div>
                          <span className="font-medium">Bank Transfer</span>
                          <p className="text-sm text-gray-600">Lower fees but takes 1-3 business days. Transfer money directly from your bank account to the exchange.</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-yellow-50 p-4 rounded-lg mt-4">
                    <div className="flex items-start gap-2">
                      <AlertTriangle className="w-6 h-6 text-yellow-600 mt-1" />
                      <p className="text-sm text-yellow-800">
                        Important: Only use regulated exchanges and never send money to individuals offering to sell cryptocurrency directly. Start with a small amount while you're learning the basics.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <h2 className="text-2xl font-bold text-blue-700 mb-6 flex items-center gap-2">
                <Wallet className="w-6 h-6" />
                Recommended Wallets
              </h2>

              <div className="grid md:grid-cols-3 gap-6">
                <ResourceCard
                  icon={Wallet}
                  title="MetaMask"
                  description="The most popular Ethereum wallet with browser extension and mobile app support. Perfect for DeFi and NFTs."
                  tags={['Ethereum', 'DeFi', 'Browser Extension', 'Mobile']}
                  color="border-orange-500"
                />

                <ResourceCard
                  icon={Wallet}
                  title="Phantom"
                  description="Leading Solana wallet with a seamless user experience. Built-in NFT support and DeFi integration."
                  tags={['Solana', 'NFTs', 'DeFi', 'User-Friendly']}
                  color="border-purple-500"
                />

                <ResourceCard
                  icon={Wallet}
                  title="Coinbase Wallet"
                  description="Secure wallet by Coinbase with easy integration to their exchange. Support for multiple chains."
                  tags={['Multi-Chain', 'Exchange Integration', 'Beginner-Friendly']}
                  color="border-blue-500"
                />
              </div>

              <div className="bg-blue-50 p-4 rounded-lg mt-6">
                <p className="text-blue-800">
                  <strong>Security Tip:</strong> Always download wallets from their official websites
                  and verify the authenticity of the source. Never share your seed phrase or private keys.
                </p>
              </div>
            </section>

            <section className="mt-8">
              <h2 className="text-2xl font-bold text-blue-700">Recommended Tools and Resources</h2>
              <div className="grid gap-6">
                <ResourceCard
                  icon={Shield}
                  title="Essential Security Tools"
                  description="Protect your digital assets with industry-standard security solutions"
                  tags={['Hardware Wallets', 'Password Managers', '2FA Apps', 'Backup Solutions']}
                  color="border-blue-500"
                />
                <ResourceCard
                  icon={Wallet}
                  title="Recommended Wallets"
                  description="Secure and user-friendly cryptocurrency wallets for beginners"
                  tags={['Mobile Wallets', 'Desktop Wallets', 'Hardware Wallets']}
                  color="border-purple-500"
                />
                <ResourceCard
                  icon={Key}
                  title="Authentication Tools"
                  description="Enhanced security through multi-factor authentication"
                  tags={['Google Authenticator', 'Yubikey', 'Biometric Security']}
                  color="border-green-500"
                />
                <ResourceCard
                  icon={Lock}
                  title="Backup & Recovery"
                  description="Tools and methods for secure backup of your crypto assets"
                  tags={['Cold Storage', 'Paper Wallets', 'Metal Backup', 'Cloud Security']}
                  color="border-orange-500"
                />
              </div>
            </section>

            <div className="bg-green-50 p-4 rounded-lg mt-6">
              <p className="text-green-800">
                🌟 Remember: The best investment you can make is in your education. Take your time to learn
                and understand before making any financial commitments.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Knowledge Check Quiz Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mt-12"
        >
          <Card>
            <CardContent className="p-6">
              <div className="bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 text-white rounded-lg p-6 mb-6">
                <h2 className="text-2xl font-bold mb-2">Knowledge Check</h2>
                <p className="text-blue-100">Test your understanding with this quick quiz</p>
              </div>

              {!quizCompleted ? (
                <div className="space-y-8">
                  <div className="space-y-6">
                    <h3 className="font-semibold text-xl text-gray-800 mb-4">
                      {questions[currentQuestionIndex].question}
                    </h3>
                    <div className="grid gap-4">
                      {questions[currentQuestionIndex].options.map((option, index) => {
                        const isSelected = selectedAnswer === index.toString();
                        const isCorrectAnswer = index === questions[currentQuestionIndex].correctAnswer;
                        let bgColor = "bg-white";
                        let borderColor = "border-gray-200";

                        if (showExplanation) {
                          if (isCorrectAnswer) {
                            bgColor = "bg-green-50";
                            borderColor = "border-green-500";
                          } else if (isSelected && !isCorrectAnswer) {
                            bgColor = "bg-red-50";
                            borderColor = "border-red-500";
                          }
                        }

                        return (
                          <button
                            key={index}
                            onClick={() => !showExplanation && handleAnswerSelect(index)}
                            className={`p-4 border-2 rounded-lg text-left transition-all duration-200 
                              ${bgColor} ${borderColor} 
                              ${!showExplanation && 'hover:border-blue-500 hover:bg-blue-50'}
                              ${isSelected ? 'shadow-md' : ''}`}
                            disabled={showExplanation}
                          >
                            {option}
                          </button>
                        );
                      })}
                    </div>

                    {showExplanation && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-6 p-4 rounded-lg bg-gray-50 border border-gray-200"
                      >
                        <div className="flex items-center gap-2 mb-2">
                          {isCorrect ? (
                            <div className="text-green-600 font-semibold flex items-center gap-2">
                              <CheckCircle2 className="h-5 w-5" />
                              Correct!
                            </div>
                          ) : (
                            <div className="text-red-600 font-semibold flex items-center gap-2">
                              <XCircle className="h-5 w-5" />
                              Incorrect
                            </div>
                          )}
                        </div>
                        <p className="text-gray-700">
                          {questions[currentQuestionIndex].explanation}
                        </p>
                        <p className="text-xs mt-2 text-gray-600">Next question in 5 seconds...</p>
                      </motion.div>
                    )}
                  </div>

                  <div className="flex items-center justify-between mt-6">
                    <p className="text-sm text-gray-500">
                      Question {currentQuestionIndex + 1} of {questions.length}
                    </p>
                    <Progress value={(currentQuestionIndex / questions.length) * 100} className="w-1/3" />
                  </div>
                </div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-8"
                >
                  <h3 className="text-2xl font-bold text-green-600 mb-4">
                    Congratulations! 🎉
                  </h3>
                  <p className="text-gray-600 mb-4">
                    You've completed the knowledge check. Redirecting to the module quiz in 5 seconds...
                  </p>
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
                </motion.div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {isFullyRead && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 space-y-6"
          >
            <Card className="bg-green-100 border-l-4 border-green-500 p-4">
              <p className="text-green-700">
                🎉 Congratulations! You've completed the Getting Started Safely section!
              </p>
            </Card>


            <div className="flex justify-between mt-4">
              <Link href="/modules/module1/applications">
                <Button variant="outline" className="gap-2">
                  <ArrowLeft className="h-4 w-4" />
                  Previous Topic
                </Button>
              </Link>
              <Link href="/modules/module1/quiz">
                <Button
                  className="bg-blue-600 hover:bg-blue-700 gap-2"
                >
                  Take Module Quiz
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default GettingStartedSection;