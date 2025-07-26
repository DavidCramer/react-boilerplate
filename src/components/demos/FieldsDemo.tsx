import React, { useState } from 'react';
import { LuSave, LuRefreshCw, LuPlus, LuTrash2 } from 'react-icons/lu';
import {
  Text,
  Textarea,
  Checkbox,
  Radio,
  Button,
  Switch,
  Autocomplete,
  IconSelector,
  Spinner,
  SvgIcon,
  RadioOption,
  AutocompleteOption
} from '@/components/fields';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface FieldsDemoProps {}

const FieldsDemo: React.FC<FieldsDemoProps> = () => {
  // Form state
  const [textValue, setTextValue] = useState<string>('');
  const [emailValue, setEmailValue] = useState<string>('');
  const [passwordValue, setPasswordValue] = useState<string>('');
  const [textareaValue, setTextareaValue] = useState<string>('');
  const [checkboxValue, setCheckboxValue] = useState<boolean>(false);
  const [checkboxIndeterminate, setCheckboxIndeterminate] = useState<boolean>(true);
  const [radioValue, setRadioValue] = useState<string>('');
  const [switchValue, setSwitchValue] = useState<boolean>(false);
  const [autocompleteValue, setAutocompleteValue] = useState<string>('');
  const [multiAutocompleteValue, setMultiAutocompleteValue] = useState<string[]>([]);
  const [iconValue, setIconValue] = useState<SvgIcon | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  // Demo data
  const radioOptions: RadioOption[] = [
    { value: 'option1', label: 'Option One' },
    { value: 'option2', label: 'Option Two' },
    { value: 'option3', label: 'Option Three' },
    { value: 'disabled', label: 'Disabled Option', disabled: true }
  ];

  const autocompleteOptions: AutocompleteOption[] = [
    { value: 'apple', label: 'Apple' },
    { value: 'banana', label: 'Banana' },
    { value: 'cherry', label: 'Cherry' },
    { value: 'date', label: 'Date' },
    { value: 'elderberry', label: 'Elderberry' },
    { value: 'fig', label: 'Fig' },
    { value: 'grape', label: 'Grape' },
    { value: 'honeydew', label: 'Honeydew' },
    { value: 'kiwi', label: 'Kiwi' },
    { value: 'lemon', label: 'Lemon' },
    { value: 'mango', label: 'Mango' },
    { value: 'disabled', label: 'Disabled Fruit', disabled: true }
  ];

  const demoIcons: SvgIcon[] = [
    {
      id: 'home',
      viewBox: '0 0 24 24',
      innerHTML: '<path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/>',
      source: 'demo',
      isDemo: true
    },
    {
      id: 'user',
      viewBox: '0 0 24 24',
      innerHTML: '<path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/>',
      source: 'demo',
      isDemo: true
    },
    {
      id: 'star',
      viewBox: '0 0 24 24',
      innerHTML: '<polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/>',
      source: 'demo',
      isDemo: true
    }
  ];

  // Handler functions
  const handleSubmit = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      alert('Form submitted successfully!');
    }, 2000);
  };

  const handleReset = () => {
    setTextValue('');
    setEmailValue('');
    setPasswordValue('');
    setTextareaValue('');
    setCheckboxValue(false);
    setCheckboxIndeterminate(true);
    setRadioValue('');
    setSwitchValue(false);
    setAutocompleteValue('');
    setMultiAutocompleteValue([]);
    setIconValue(null);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Fields Demo</h1>
        <p className="text-gray-600">Comprehensive showcase of all form field components</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column - Text Inputs */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Text Inputs</h2>

            <div className="space-y-4">
              <Text
                label="Text Input"
                value={textValue}
                onChange={setTextValue}
                placeholder="Enter some text..."
                help="This is a basic text input field"
              />

              <Text
                label="Email Input"
                type="email"
                value={emailValue}
                onChange={setEmailValue}
                placeholder="Enter your email..."
                help="Email validation is handled by the browser"
                required
              />

              <Text
                label="Password Input"
                type="password"
                value={passwordValue}
                onChange={setPasswordValue}
                placeholder="Enter password..."
                help="Password characters are hidden"
                required
              />

              <Text
                label="Disabled Input"
                value="This field is disabled"
                disabled
                help="This field cannot be edited"
              />

              <Text
                label="Input with Error"
                value="Invalid value"
                error="This field has an error"
              />
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Textarea</h2>

            <div className="space-y-4">
              <Textarea
                label="Multi-line Text"
                value={textareaValue}
                onChange={setTextareaValue}
                placeholder="Enter multiple lines of text..."
                help="This textarea supports multiple lines"
                rows={4}
                maxLength={200}
              />

              <Textarea
                label="Disabled Textarea"
                value="This textarea is disabled and cannot be edited"
                disabled
                rows={2}
              />
            </div>
          </div>
        </div>

        {/* Right Column - Selection Inputs */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Selection Fields</h2>

            <div className="space-y-6">
              <Checkbox
                label="Accept Terms and Conditions"
                checked={checkboxValue}
                onChange={setCheckboxValue}
                help="Check this to accept the terms"
                required
              />

              <Checkbox
                label="Indeterminate Checkbox"
                checked={false}
                indeterminate={checkboxIndeterminate}
                onChange={() => setCheckboxIndeterminate(!checkboxIndeterminate)}
                help="This checkbox is in an indeterminate state"
              />

              <Switch
                label="Small Switch"
                checked={switchValue}
                onChange={setSwitchValue}
                size="sm"
                help="This is a smaller switch"
              />

              <Switch
                label="Enable Notifications"
                checked={switchValue}
                onChange={setSwitchValue}
                help="Toggle to enable or disable notifications"
              />

              <Switch
                label="Large Switch"
                checked={switchValue}
                onChange={setSwitchValue}
                size="lg"
                help="This is a larger switch"
              />
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Radio Options</h2>

            <div className="space-y-4">
              <Radio
                label="Choose an Option (Vertical)"
                options={radioOptions}
                value={radioValue}
                onChange={setRadioValue}
                help="Select one option from the list"
                required
              />

              <Radio
                label="Horizontal Layout"
                options={radioOptions.slice(0, 3)}
                value={radioValue}
                onChange={setRadioValue}
                direction="horizontal"
                help="Options displayed horizontally"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Full Width Components */}
      <div className="space-y-6">
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Advanced Components</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Autocomplete
              label="Single Fruit Selection"
              options={autocompleteOptions}
              value={autocompleteValue}
              onChange={(value) => setAutocompleteValue(value as string)}
              placeholder="Search for fruits..."
              help="Start typing to filter options"
            />

            <Autocomplete
              label="Multiple Fruit Selection"
              options={autocompleteOptions}
              value={multiAutocompleteValue}
              onChange={(value) => setMultiAutocompleteValue(value as string[])}
              placeholder="Search for multiple fruits..."
              help="Select multiple fruits - use backspace to remove"
              multiple
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <IconSelector
              label="Choose an Icon"
              options={demoIcons}
              value={iconValue}
              onChange={setIconValue}
              placeholder="Select an icon..."
              help="Pick from available icons"
            />

            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-medium text-gray-900 mb-2">Multi-Select Features:</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Selected items show as tags</li>
                <li>• Click × to remove individual items</li>
                <li>• Backspace removes last item when input is empty</li>
                <li>• Dropdown stays open for multiple selections</li>
                <li>• Already selected items are hidden from options</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Buttons</h2>

          <div className="space-y-4">
            <div className="flex flex-wrap gap-3">
              <Button variant="primary" onClick={handleSubmit} loading={loading} leftIcon={<LuSave />}>
                {loading ? 'Saving...' : 'Save Form'}
              </Button>

              <Button variant="secondary" onClick={handleReset} leftIcon={<LuRefreshCw />}>
                Reset
              </Button>

              <Button variant="outline" leftIcon={<LuPlus />}>
                Add Item
              </Button>

              <Button variant="danger" leftIcon={<LuTrash2 />}>
                Delete
              </Button>

              <Button variant="ghost">
                Cancel
              </Button>
            </div>

            <div className="flex flex-wrap gap-3">
              <Button size="sm" variant="primary">Small</Button>
              <Button size="md" variant="primary">Medium</Button>
              <Button size="lg" variant="primary">Large</Button>
            </div>

            <div className="max-w-xs">
              <Button fullWidth variant="primary">
                Full Width Button
              </Button>
            </div>

            <div className="flex flex-wrap gap-3">
              <Button disabled>Disabled Button</Button>
              <Button loading>Loading Button</Button>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Spinner Component</h2>
          
          <div className="space-y-6">
            {/* Size Variants */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-3">Size Variants</h3>
              <div className="flex items-center gap-6">
                <div className="text-center">
                  <Spinner size="sm" />
                  <p className="text-sm text-gray-600 mt-2">Small (sm)</p>
                </div>
                <div className="text-center">
                  <Spinner size="md" />
                  <p className="text-sm text-gray-600 mt-2">Medium (md)</p>
                </div>
                <div className="text-center">
                  <Spinner size="lg" />
                  <p className="text-sm text-gray-600 mt-2">Large (lg)</p>
                </div>
                <div className="text-center">
                  <Spinner size="xl" />
                  <p className="text-sm text-gray-600 mt-2">Extra Large (xl)</p>
                </div>
              </div>
            </div>

            {/* Color Variants */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-3">Color Variants</h3>
              <div className="flex items-center gap-6">
                <div className="text-center text-gray-600">
                  <Spinner size="md" />
                  <p className="text-sm mt-2">Default (gray)</p>
                </div>
                <div className="text-center text-blue-600">
                  <Spinner size="md" />
                  <p className="text-sm mt-2">Blue</p>
                </div>
                <div className="text-center text-green-600">
                  <Spinner size="md" />
                  <p className="text-sm mt-2">Green</p>
                </div>
                <div className="text-center text-red-600">
                  <Spinner size="md" />
                  <p className="text-sm mt-2">Red</p>
                </div>
                <div className="text-center text-purple-600">
                  <Spinner size="md" />
                  <p className="text-sm mt-2">Purple</p>
                </div>
              </div>
              <p className="text-sm text-gray-500 mt-2">
                Spinner inherits color from parent text color using <code className="bg-gray-100 px-1 rounded">currentColor</code>
              </p>
            </div>

            {/* Usage Examples */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-3">Usage Examples</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Loading Card */}
                <div className="border border-gray-200 rounded-lg p-4 text-center">
                  <Spinner size="lg" className="mx-auto mb-3 text-blue-600" />
                  <p className="text-gray-600">Loading content...</p>
                </div>

                {/* Inline with Text */}
                <div className="border border-gray-200 rounded-lg p-4 flex items-center justify-center gap-2">
                  <Spinner size="sm" className="text-gray-500" />
                  <span className="text-gray-600">Processing request</span>
                </div>

                {/* In Button (manual example) */}
                <div className="border border-gray-200 rounded-lg p-4 flex justify-center">
                  <button 
                    className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md font-medium"
                    disabled
                  >
                    <Spinner size="sm" className="mr-2" />
                    Submitting...
                  </button>
                </div>

                {/* Different Background */}
                <div className="border border-gray-200 rounded-lg p-4 bg-gray-900 text-white text-center">
                  <Spinner size="md" className="mx-auto mb-2" />
                  <p className="text-gray-300">Loading on dark background</p>
                </div>
              </div>
            </div>

            {/* Code Examples */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-3">Code Examples</h3>
              <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                <div className="font-mono text-sm">
                  <span className="text-gray-600">// Basic usage</span><br/>
                  <span className="text-blue-600">&lt;Spinner</span> <span className="text-green-600">size=</span><span className="text-orange-600">"md"</span> <span className="text-blue-600">/&gt;</span>
                </div>
                <div className="font-mono text-sm">
                  <span className="text-gray-600">// With custom styling</span><br/>
                  <span className="text-blue-600">&lt;Spinner</span> <span className="text-green-600">size=</span><span className="text-orange-600">"lg"</span> <span className="text-green-600">className=</span><span className="text-orange-600">"text-blue-600 mx-auto"</span> <span className="text-blue-600">/&gt;</span>
                </div>
                <div className="font-mono text-sm">
                  <span className="text-gray-600">// Available sizes: sm, md, lg, xl</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Form State Display */}
      <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-3">Current Form State</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <p><strong>Text:</strong> "{textValue}"</p>
            <p><strong>Email:</strong> "{emailValue}"</p>
            <p><strong>Password:</strong> {"*".repeat(passwordValue.length)}</p>
            <p><strong>Textarea:</strong> "{textareaValue.substring(0, 50)}{textareaValue.length > 50 ? '...' : ''}"</p>
          </div>
          <div>
            <p><strong>Checkbox:</strong> {checkboxValue ? 'Checked' : 'Unchecked'}</p>
            <p><strong>Radio:</strong> "{radioValue}"</p>
            <p><strong>Switch:</strong> {switchValue ? 'On' : 'Off'}</p>
            <p><strong>Single Autocomplete:</strong> "{autocompleteValue}"</p>
            <p><strong>Multi Autocomplete:</strong> [{multiAutocompleteValue.map(v => `"${v}"`).join(', ')}]</p>
            <p><strong>Icon:</strong> {iconValue ? iconValue.id : 'None selected'}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export { FieldsDemo, type FieldsDemoProps };
