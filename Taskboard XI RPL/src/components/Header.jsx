import { useState, useEffect } from 'react';

export default function Header({ total, selesai, belum, theme, onToggleTheme }) {
    const [isFullscreen, setIsFullscreen] = useState(false);

    useEffect(() => {
        function onFullscreenChange() {
            setIsFullscreen(Boolean(document.fullscreenElement));
        }
        document.addEventListener('fullscreenchange', onFullscreenChange);
        return () => document.removeEventListener('fullscreenchange', onFullscreenChange);
    }, []);

    function toggleFullscreen() {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen().catch((err) => {
                console.error(`Gagal masuk ke mode fullscreen: ${err.message}`);
            });
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            }
        }
    }

    const persentase = total === 0 ? 0 : Math.round((selesai / total) * 100);

    return (
        <header className="app-header" style={{ flexDirection: 'column' }}>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', width: '100%', flexWrap: 'wrap', gap: '12px' }}>
                <div>
                    <p className="eyebrow">REACT PROJECT XI RPL</p>
                    <h1>TaskBoard Kelas</h1>
                    <p>Catat, kerjakan, dan pantau progres tugasmu.</p>
                </div>

                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    <button
                        onClick={onToggleTheme}
                        style={{
                            background: 'rgba(255, 255, 255, 0.2)',
                            border: 'none',
                            color: 'white',
                            padding: '8px 14px',
                            borderRadius: '8px',
                            cursor: 'pointer',
                            fontSize: '12px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px',
                            transition: 'background 0.3s',
                            whiteSpace: 'nowrap'
                        }}
                    >
                        {theme === 'light' ? '🌙 Mode Gelap' : '☀️ Mode Terang'}
                    </button>

                    <button
                        onClick={toggleFullscreen}
                        style={{
                            background: 'rgba(255, 255, 255, 0.2)',
                            border: 'none',
                            color: 'white',
                            padding: '8px 14px',
                            borderRadius: '8px',
                            cursor: 'pointer',
                            fontSize: '12px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px',
                            transition: 'background 0.3s',
                            whiteSpace: 'nowrap'
                        }}
                    >
                        {isFullscreen ? '🗗 Keluar Full Screen' : '⛶ Full Screen'}
                    </button>
                </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-start', width: '100%', marginTop: '16px' }}>
                <div className="stats" style={{ textAlign: 'left', minWidth: 'auto' }}>
                    <strong>{selesai}/{total}</strong>
                    <span>tugas selesai ({belum} belum selesai)</span>
                </div>
            </div>

            <div style={{ width: '100%', marginTop: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '6px' }}>
                    <span>Progres Pengerjaan</span>
                    <span>{persentase}%</span>
                </div>
                <div style={{ background: 'rgba(255,255,255,0.2)', height: '10px', borderRadius: '5px', overflow: 'hidden' }}>
                    <div
                        style={{
                            background: '#4caf50',
                            height: '100%',
                            width: `${persentase}%`,
                            transition: 'width 0.4s ease'
                        }}
                    ></div>
                </div>
            </div>
        </header>
    );
}