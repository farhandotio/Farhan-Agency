import React from 'react';

import {
  FiDownload,
  FiUsers,
  FiTruck,
  FiAlertTriangle,
  FiFileText,
  FiGrid,
  FiTarget,
  FiZap,
  FiLayers,
  FiCode,
  FiClipboard,
  FiDollarSign,
} from 'react-icons/fi';
import { generateStepPDF } from '../../utils/generateStepPDF';
import PrimaryButton from '../common/PrimaryButton';

const IconMapper = ({ iconName, className }) => {
  switch (iconName) {
    case 'document':
      return <FiFileText className={className} />;
    case 'squares':
      return <FiGrid className={className} />;
    case 'puzzle':
      return <FiLayers className={className} />;
    case 'rocket':
      return <FiTarget className={className} />;
    case 'flow-chart':
      return <FiLayers className={className} />;
    case 'api':
      return <FiCode className={className} />;
    case 'credit-card':
      return <FiZap className={className} />;
    default:
      return <FiFileText className={className} />;
  }
};

const ProcessCard = ({ stepData, isLast }) => {
  const {
    id,
    step,
    iconName,
    iconBgColor,
    title,
    week,
    description,
    deliverables,
    collaboration,
    template,
    type,
    paymentStructure,
    deliveryProcess,
    qualityAssurance,
  } = stepData;

  return (
    <div className="relative flex items-start gap-2 md:gap-5 pb-12">
      <div className="flex flex-col items-center h-140 md:h-80">
        <div
          className={`size-8 md:size-16 rounded-lg md:rounded-2xl flex items-center justify-center p-1.5 md:p-3 shadow-md ${iconBgColor}`}
        >
          <IconMapper iconName={iconName} className="size-full text-text" />
        </div>
        {/* {!isLast && ( */}
        <div
          className={`h-full w-1 rounded-full bg-linear-to-t ${iconBgColor} from-cardBg mt-4`}
        ></div>
        {/* )} */}
      </div>

      <div className="flex-1 bg-bg p-4 md:p-5 rounded-xl shadow-lg border border-border">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <span
              className={`${iconBgColor} text-white text-xs font-semibold px-2 md:px-2.5 py-0.5 md:py-1 rounded-full whitespace-nowrap`}
            >
              {step}
            </span>
            <h3 className="text md:text-2xl font-bold text-text">{title}</h3>
          </div>
          <span className="text-xs md:text-sm font-semibold whitespace-nowrap text-mutedText">
            {week}
          </span>
        </div>

        <p className="text-mutedText mb-6">{description}</p>

        {type === 'standard' ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <h4 className="flex items-center gap-2 md:text-lg font-semibold text-mutedText mb-3">
                  <FiClipboard className="size-5 text-secondary" /> Purpose & Deliverables
                </h4>
                <ul className="list-none space-y-2 text-mutedText ml-2">
                  {deliverables.map((item, i) => (
                    <li key={i} className="flex items-start">
                      <span className="mr-2 text-primary">•</span> {item}
                    </li>
                  ))}
                </ul>
              </div>

              {collaboration && (
                <div>
                  <h4 className="flex items-center gap-2 md:text-lg font-semibold text-mutedText mb-3">
                    <FiUsers className="size-5 text-primary" /> Collaboration Points
                  </h4>
                  <div className={`p-4 rounded-lg bg-cardBg border border-border`}>
                    <p className="md:text-lg font-bold text-mutedText">{collaboration.main}</p>
                    <p className="text-sm text-mutedText">{collaboration.note}</p>
                  </div>
                </div>
              )}
            </div>

            <div className="w-fit">
              {template && (
                <PrimaryButton
                  text="Download Step PDF"
                  icon={FiDownload}
                  onClick={() => generateStepPDF(stepData)}
                  size="md"
                  bgColor={iconBgColor}
                  className="mt-3 rounded-md"
                />
              )}
            </div>
          </>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <h4 className="flex items-center gap-2 text-lg font-semibold text-mutedText mb-3">
                  <FiDollarSign className="size-5 text-secondary" /> Payment Structure
                </h4>
                <div className="space-y-3">
                  {paymentStructure.map((item, i) => (
                    <div
                      key={i}
                      className={`flex justify-between items-center p-3 rounded-lg bg-warningBg text-text`}
                    >
                      <span className="font-semibold">{item.percentage}</span>
                      <span className="text-sm">{item.description}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="flex items-center gap-2 text-lg font-semibold text-mutedText mb-3">
                  <FiTruck className="size-5 text-primary" /> Delivery Process
                </h4>
                <ul className="list-none space-y-2 text-mutedText ml-2">
                  {deliveryProcess.map((item, i) => (
                    <li key={i} className="flex items-start">
                      <span className="mr-2 text-primary">•</span> {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="w-fit mb-5">
              {template && (
                <PrimaryButton
                  text="Download Step PDF"
                  icon={FiDownload}
                  onClick={() => generateStepPDF(stepData)}
                  size="md"
                  bgColor={iconBgColor}
                  className="mt-3 rounded-md"
                />
              )}
            </div>

            {qualityAssurance && (
              <div className="flex items-start p-4 rounded-lg bg-warningBg border border-warning text-warning">
                <FiAlertTriangle className="size-5 mr-3 shrink-0 text-warning" />
                <p className="text-sm">{qualityAssurance}</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ProcessCard;
