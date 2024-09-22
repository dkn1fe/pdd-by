import { FC } from "react"

interface MistakeControlWindowProps {
    mistake: number,
    question: any[]
}

export const MistakeControlWindow: FC<MistakeControlWindowProps> = ({ mistake, question }) => {


    return (
        <>
            <div className="relative p-3 h-[100px] pt-5 border-b border-gray-400">
                <h3 className="text-xl">{question[mistake]?.question}</h3>
            </div>
            {question[mistake]?.image && (
                <div className="flex gap-5 p-2">
                    <div className="relative pl-5">
                        <img
                            src={question[mistake]?.image}
                            alt="question illustration"
                            className="max-w-full max-h-[400px] object-cover"
                        />
                    </div>
                    <div className="border-l border-gray-300" />
                    <div className="w-1/2 p-3">
                        <ol className="list-decimal pl-5">
                            {question[mistake]?.options?.map((item, index) => (
                                <li key={index + 1} className="mb-1">
                                    <p className="text-lg pt-2">{item}</p>
                                </li>
                            ))}
                        </ol>
                    </div>
                </div>
            )}

            {!question[mistake]?.image && (
                <div className="p-3 border-b border-gray-400">
                    <ol className="list-decimal pl-5">
                        {question[mistake]?.options?.map((item, index) => (
                            <li key={index + 1} className="mb-1">
                                <p className="text-lg">{item}</p>
                            </li>
                        ))}
                    </ol>
                </div>
            )}
        </>
    )
}