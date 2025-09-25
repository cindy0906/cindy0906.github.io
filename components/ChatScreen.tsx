import React, { useState, useEffect } from 'react';
import { useTypingEffect } from '../hooks/useTypingEffect';
import { 
    ArrowLeftIcon, LinkIcon, LotusIcon, MusicNoteIcon, CheckIcon, PaperAirplaneIcon 
} from './Icons';
import type { Avatar } from '../types';

const avatars: Avatar[] = [
    { name: '레나', suitability: 97, imageUrl: 'https://i.pravatar.cc/100?u=lena', selected: true },
    { name: '톰', suitability: 88, imageUrl: 'https://i.pravatar.cc/100?u=tom' },
    { name: '수잔', suitability: 85, imageUrl: 'https://i.pravatar.cc/100?u=susan' },
    { name: '로이스', suitability: 75, imageUrl: 'https://i.pravatar.cc/100?u=lois' },
];

const ChatHeader: React.FC = () => (
    <header className="sticky top-0 z-10 flex items-center justify-between p-4 bg-[#111111]/80 backdrop-blur-sm">
        <button className="text-white">
            <ArrowLeftIcon />
        </button>
        <h1 className="text-lg font-bold text-white">마음 지킴이 AI챗봇</h1>
        <button className="text-white">
            <LinkIcon />
        </button>
    </header>
);

const AIMessage: React.FC<{ text: string }> = ({ text }) => {
    return (
        <div className="flex items-start space-x-3">
            <img src="https://picsum.photos/seed/ai/40/40" alt="마음 지킴이 아바타" className="w-8 h-8 rounded-full" />
            <div>
                <p className="font-semibold text-gray-200">마음 지킴이</p>
                <div className="mt-1 p-3 bg-[#1C1C1E] rounded-lg rounded-tl-none">
                    <p className="text-gray-300 whitespace-pre-line min-h-[168px]">{text}</p>
                </div>
            </div>
        </div>
    );
};

const SolutionCard: React.FC = () => (
    <div className="bg-[#332D49] rounded-2xl p-5 my-6">
        <h2 className="font-bold text-white">맞춤형 솔루션 제안</h2>
        <p className="text-sm text-gray-400 mb-4">불면 치료와 스트레스 관리를 위한 활동을 제안</p>
        <div className="space-y-4">
            <div className="flex items-center space-x-4">
                <div className="bg-purple-500/20 p-2 rounded-full">
                    <LotusIcon />
                </div>
                <div>
                    <h3 className="font-semibold text-white">명상 시작하기</h3>
                    <p className="text-sm text-gray-400">5분간의 가이드 명상</p>
                </div>
            </div>
            <div className="flex items-center space-x-4">
                <div className="bg-blue-500/20 p-2 rounded-full">
                    <MusicNoteIcon />
                </div>
                <div>
                    <h3 className="font-semibold text-white">마음이 편안해지는 음악</h3>
                    <p className="text-sm text-gray-400">엄선된 플레이리스트</p>
                </div>
            </div>
        </div>
    </div>
);

const AvatarItem: React.FC<{ avatar: Avatar }> = ({ avatar }) => (
    <div className="flex flex-col items-center space-y-2">
        <div className={`relative ${avatar.selected ? 'p-0.5 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full' : ''}`}>
            <img src={avatar.imageUrl} alt={avatar.name} className="w-16 h-16 rounded-full border-2 border-[#111111]" />
        </div>
        <p className="font-semibold text-white">{avatar.name}</p>
        <p className="text-xs text-gray-400">적합도 {avatar.suitability}%</p>
    </div>
);

const ConversationMode: React.FC = () => (
    <div className="my-6">
        <h2 className="text-xl font-bold text-white mb-2">대화 모드</h2>
        <div className="flex items-center space-x-1.5 mb-4">
            <CheckIcon />
            <p className="text-sm text-green-400 font-medium">경미한 우울감 상담을 위한 [레나] 추천</p>
        </div>
        <div className="grid grid-cols-5 items-end">
            {avatars.map(avatar => <AvatarItem key={avatar.name} avatar={avatar} />)}
            <div className="flex flex-col items-center space-y-2">
                <button className="w-16 h-16 rounded-full bg-[#2C2C2E] flex items-center justify-center">
                    <p className="text-sm text-gray-300">더보기</p>
                </button>
            </div>
        </div>
    </div>
);

const MessageInput: React.FC = () => (
    <footer className="sticky bottom-0 z-10 p-4 bg-[#111111]">
        <div className="flex items-center bg-[#2C2C2E] rounded-full p-2">
            <input 
                type="text" 
                placeholder="메시지를 입력하세요..." 
                className="flex-grow bg-transparent text-white placeholder-gray-500 px-4 focus:outline-none"
            />
            <button className="bg-[#7F56D9] rounded-full p-3 flex-shrink-0">
                <PaperAirplaneIcon />
            </button>
        </div>
    </footer>
);

const ChatScreen: React.FC = () => {
    const fullText = "안녕하세요 성민님!\n지난 2주간 평균 수면 시간이 5시간 이하로 떨어졌고, 뒤척임 횟수가 증가했네요. HRV 수치도 최근 검진에서 낮게 측정되었구요.\n이런 생체 신호는 불면 및 스트레스 수준이 심각하다는 경고 신호가 될 수 있어요.\n지금 바로 불면증과 함께 경미한 우울감에 필요한 상담모드를 사용해보세요!";
    const [typedText, isTypingFinished] = useTypingEffect(fullText, 30);
    const [showContent, setShowContent] = useState(false);

    useEffect(() => {
        if (isTypingFinished) {
            const timer = setTimeout(() => setShowContent(true), 200);
            return () => clearTimeout(timer);
        }
    }, [isTypingFinished]);

    return (
        <div className="flex flex-col h-screen bg-[#111111] text-white">
            <ChatHeader />
            <main className="flex-grow overflow-y-auto px-4">
                <AIMessage text={typedText} />
                
                <div className={`pl-11 transition-all duration-500 ease-out ${showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                    <SolutionCard />
                </div>
                
                <div 
                    className={`pl-11 transition-all duration-500 ease-out ${showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
                    style={{ transitionDelay: showContent ? '200ms' : '0ms' }}
                >
                    <ConversationMode />
                </div>
            </main>
            <MessageInput />
        </div>
    );
};

export default ChatScreen;