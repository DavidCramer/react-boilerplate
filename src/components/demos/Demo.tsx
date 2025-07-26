import React, { useState } from 'react';
import { Tabs } from '@/components/ui';
import { FieldsDemo } from './FieldsDemo';
import { UiDemo } from './UiDemo';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface DemoProps {}

const Demo: React.FC<DemoProps> = () => {
  const [activeTab, setActiveTab] = useState('fields');

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-6">
            <Tabs value={activeTab} onChange={setActiveTab}>
              <Tabs.List className="justify-center">
                <Tabs.Trigger value="fields">Form Fields</Tabs.Trigger>
                <Tabs.Trigger value="ui">UI Components</Tabs.Trigger>
              </Tabs.List>
            </Tabs>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onChange={setActiveTab}>
          <Tabs.Content value="fields">
            <div className="bg-white rounded-lg shadow-sm">
              <FieldsDemo />
            </div>
          </Tabs.Content>

          <Tabs.Content value="ui">
            <div className="bg-white rounded-lg shadow-sm">
              <UiDemo />
            </div>
          </Tabs.Content>
        </Tabs>
      </div>

    </div>
  );
};

export { Demo, type DemoProps };
