declare var BLOCKFROST_PROJECT_ID: string;
import { Buffer } from 'buffer';
import { FC, useCallback, useState } from 'react';
import { createRoot } from 'react-dom/client';
import HandleClient, { HandleClientContext, KoraLabsProvider } from '../../lib';
import { BlockfrostHandle, BlockfrostProvider } from '../../lib/classes/providers/BlockfrostProvider.class';

import { AssetNameLabel, IHandle, IPersonalization } from '@koralabs/handles-public-api-interfaces';
import JSONView from 'react-json-view';

const KoraInstance = new HandleClient({
    context: HandleClientContext.MAINNET,
    provider: new KoraLabsProvider(HandleClientContext.MAINNET)
});

const BlockfrostInstance = new HandleClient({
    context: HandleClientContext.MAINNET,
    provider: new BlockfrostProvider(HandleClientContext.MAINNET, BLOCKFROST_PROJECT_ID)
});

const App: FC = () => {
    const [handleName, setHandleName] = useState('');
    const [cip68, setCip68] = useState(false);
    const [blockfrostResult, setBlockfrostResult] = useState<BlockfrostHandle | IHandle>();
    const [koraResult, setKoraResult] = useState<IHandle>();
    const [personalizedResult, setPersonalizedResult] = useState<IPersonalization>();
    const [loading, setLoading] = useState(false);

    const handleSearch = useCallback(
        async (handle: string) => {
            setLoading(true);

            const realHandle =
                (cip68 ? AssetNameLabel.LABEL_222 : '') + Buffer.from(handle.replace('$', '')).toString('hex');
            const blockfrostData = await BlockfrostInstance.provider().getAllData({ value: realHandle });
            const koraData = await KoraInstance.provider().getAllData({ value: realHandle });
            const personalizedData = await KoraInstance.provider().getPersonalizedData({ value: realHandle });

            setLoading(false);
            blockfrostData && setBlockfrostResult(blockfrostData);
            koraData && setKoraResult(koraData);
            personalizedData && setPersonalizedResult(personalizedData);
        },
        [cip68]
    );

    return (
        <>
            <div
                style={{
                    maxWidth: '1200px',
                    margin: '0 auto'
                }}
            >
                <input
                    type="text"
                    value={handleName}
                    onChange={(e) => setHandleName(e.target.value)}
                    placeholder="Type a name to search."
                />
                <input type="button" value="Search" onClick={() => handleSearch(handleName)} />
                <input
                    type="button"
                    value="Clear"
                    onClick={() => {
                        setHandleName('');
                        setBlockfrostResult(undefined);
                        setKoraResult(undefined);
                    }}
                />
                <label htmlFor="cip68">Use CIP-68?</label>
                <input id="cip-68" type="checkbox" checked={cip68} onChange={(e) => setCip68(e.target.checked)} />
                <h2>Results</h2>
                {!blockfrostResult && !koraResult && <h4>{!loading ? 'No results.' : 'Loading...'}</h4>}
                {(blockfrostResult || koraResult) && (
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'start',
                            justifyContent: 'space-between',
                            margin: '20px auto 0',
                            gap: '20px'
                        }}
                    >
                        {blockfrostResult && (
                            <div>
                                <h4>Blockfrost Result</h4>
                                <JSONView src={blockfrostResult} />
                            </div>
                        )}

                        {koraResult && (
                            <div>
                                <h4>Kora Labs Result</h4>
                                <JSONView src={koraResult} />
                            </div>
                        )}

                        {personalizedResult && (
                            <div>
                                <h4>Personalized Result</h4>
                                <JSONView src={personalizedResult} />
                            </div>
                        )}
                    </div>
                )}
            </div>
        </>
    );
};

const target = document.querySelector('#app');
if (target) {
    const root = createRoot(target);
    root.render(<App />);
}
