import React, { useState } from 'react';
import { LuSettings, LuTrash2, LuFilePen, LuCopy, LuDownload, LuShare } from 'react-icons/lu';
import { Panel, Tabs, Dropdown, Modal } from '@/components/ui';
import { Button } from '@/components/fields';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface UiDemoProps {}

const UiDemo: React.FC<UiDemoProps> = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalSize, setModalSize] = useState<'sm' | 'md' | 'lg' | 'xl'>('md');
  const [selectedTab, setSelectedTab] = useState('panel');

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">UI Components Demo</h1>
        <p className="text-gray-600">Showcase of reusable UI components built with compound patterns</p>
      </div>

      <Tabs defaultTab={selectedTab} onChange={setSelectedTab} className="space-y-6">
        <Tabs.List>
          <Tabs.Trigger value="panel">Panel</Tabs.Trigger>
          <Tabs.Trigger value="tabs">Tabs</Tabs.Trigger>
          <Tabs.Trigger value="dropdown">Dropdown</Tabs.Trigger>
          <Tabs.Trigger value="modal">Modal</Tabs.Trigger>
        </Tabs.List>

        {/* Panel Demo */}
        <Tabs.Content value="panel">
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Panel Component</h2>
              <p className="text-gray-600 mb-6">
                Flexible container component with header, body, and footer sections. Perfect for cards, forms, and content sections.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Default Panel */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-3">Default Variant</h3>
                <Panel>
                  <Panel.Header>
                    <h4 className="font-semibold text-gray-900">User Profile</h4>
                  </Panel.Header>
                  <Panel.Body>
                    <div className="space-y-3">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Name</label>
                        <p className="text-gray-900">John Doe</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Email</label>
                        <p className="text-gray-900">john@example.com</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Role</label>
                        <p className="text-gray-900">Administrator</p>
                      </div>
                    </div>
                  </Panel.Body>
                  <Panel.Footer>
                    <Button size="sm" variant="outline">Cancel</Button>
                    <Button size="sm" variant="primary">Save Changes</Button>
                  </Panel.Footer>
                </Panel>
              </div>

              {/* Elevated Panel */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-3">Elevated Variant</h3>
                <Panel variant="elevated">
                  <Panel.Header>
                    <h4 className="font-semibold text-gray-900">Project Stats</h4>
                  </Panel.Header>
                  <Panel.Body>
                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Total Tasks</span>
                        <span className="font-semibold">24</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Completed</span>
                        <span className="font-semibold text-green-600">18</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">In Progress</span>
                        <span className="font-semibold text-blue-600">4</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Pending</span>
                        <span className="font-semibold text-orange-600">2</span>
                      </div>
                    </div>
                  </Panel.Body>
                  <Panel.Footer align="center">
                    <Button size="sm" variant="primary">View Details</Button>
                  </Panel.Footer>
                </Panel>
              </div>

              {/* Outlined Panel */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-3">Outlined Variant</h3>
                <Panel variant="outlined">
                  <Panel.Header>
                    <h4 className="font-semibold text-gray-900">Recent Activity</h4>
                  </Panel.Header>
                  <Panel.Body>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-sm">User logged in</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <span className="text-sm">Profile updated</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                        <span className="text-sm">Password changed</span>
                      </div>
                    </div>
                  </Panel.Body>
                  <Panel.Footer align="between">
                    <span className="text-sm text-gray-500">Last 24 hours</span>
                    <Button size="sm" variant="ghost">View All</Button>
                  </Panel.Footer>
                </Panel>
              </div>
            </div>

            {/* Code Example */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="text-lg font-medium text-gray-900 mb-3">Usage Example</h3>
              <pre className="text-sm text-gray-800 overflow-x-auto">
{`<Panel variant="elevated">
  <Panel.Header>
    <h4>Title</h4>
  </Panel.Header>
  <Panel.Body>
    Content goes here
  </Panel.Body>
  <Panel.Footer align="right">
    <Button>Action</Button>
  </Panel.Footer>
</Panel>`}
              </pre>
            </div>
          </div>
        </Tabs.Content>

        {/* Tabs Demo */}
        <Tabs.Content value="tabs">
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Tabs Component</h2>
              <p className="text-gray-600 mb-6">
                Accessible tabs component with keyboard navigation and context-based state management.
              </p>
            </div>

            <Panel variant="elevated">
              <Panel.Header>
                <h3 className="text-lg font-medium text-gray-900">Nested Tabs Example</h3>
              </Panel.Header>
              <Panel.Body>
                <Tabs defaultTab="overview" className="mt-4">
                  <Tabs.List>
                    <Tabs.Trigger value="overview">Overview</Tabs.Trigger>
                    <Tabs.Trigger value="analytics">Analytics</Tabs.Trigger>
                    <Tabs.Trigger value="settings">Settings</Tabs.Trigger>
                    <Tabs.Trigger value="disabled" disabled>Disabled</Tabs.Trigger>
                  </Tabs.List>

                  <Tabs.Content value="overview">
                    <div className="space-y-4">
                      <h4 className="font-medium text-gray-900">Project Overview</h4>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-blue-50 p-4 rounded-lg">
                          <div className="text-2xl font-bold text-blue-600">156</div>
                          <div className="text-sm text-blue-800">Total Users</div>
                        </div>
                        <div className="bg-green-50 p-4 rounded-lg">
                          <div className="text-2xl font-bold text-green-600">89%</div>
                          <div className="text-sm text-green-800">Completion Rate</div>
                        </div>
                        <div className="bg-purple-50 p-4 rounded-lg">
                          <div className="text-2xl font-bold text-purple-600">12</div>
                          <div className="text-sm text-purple-800">Active Projects</div>
                        </div>
                      </div>
                    </div>
                  </Tabs.Content>

                  <Tabs.Content value="analytics">
                    <div className="space-y-4">
                      <h4 className="font-medium text-gray-900">Analytics Dashboard</h4>
                      <div className="bg-gray-100 h-32 rounded-lg flex items-center justify-center">
                        <span className="text-gray-500">📊 Chart would go here</span>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Page Views</label>
                          <p className="text-2xl font-bold text-gray-900">24,567</p>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Bounce Rate</label>
                          <p className="text-2xl font-bold text-gray-900">32.1%</p>
                        </div>
                      </div>
                    </div>
                  </Tabs.Content>

                  <Tabs.Content value="settings">
                    <div className="space-y-4">
                      <h4 className="font-medium text-gray-900">Project Settings</h4>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <label className="text-sm font-medium text-gray-700">Email Notifications</label>
                          <input type="checkbox" className="rounded" defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                          <label className="text-sm font-medium text-gray-700">Auto-save</label>
                          <input type="checkbox" className="rounded" defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                          <label className="text-sm font-medium text-gray-700">Public Visibility</label>
                          <input type="checkbox" className="rounded" />
                        </div>
                      </div>
                    </div>
                  </Tabs.Content>
                </Tabs>
              </Panel.Body>
            </Panel>

            {/* Code Example */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="text-lg font-medium text-gray-900 mb-3">Usage Example</h3>
              <pre className="text-sm text-gray-800 overflow-x-auto">
{`<Tabs defaultTab="tab1" onChange={handleTabChange}>
  <Tabs.List>
    <Tabs.Trigger value="tab1">Tab 1</Tabs.Trigger>
    <Tabs.Trigger value="tab2">Tab 2</Tabs.Trigger>
    <Tabs.Trigger value="tab3" disabled>Disabled</Tabs.Trigger>
  </Tabs.List>
  
  <Tabs.Content value="tab1">
    Content for tab 1
  </Tabs.Content>
  <Tabs.Content value="tab2">
    Content for tab 2
  </Tabs.Content>
</Tabs>`}
              </pre>
            </div>
          </div>
        </Tabs.Content>

        {/* Dropdown Demo */}
        <Tabs.Content value="dropdown">
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Dropdown Component</h2>
              <p className="text-gray-600 mb-6">
                Flexible dropdown menu component with multiple trigger variants, positioning options, and composable items.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Default Dropdown */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-3">Default Variant</h3>
                <Dropdown>
                  <Dropdown.Trigger>
                    Actions
                  </Dropdown.Trigger>
                  <Dropdown.Content>
                    <Dropdown.Item onClick={() => alert('Edit clicked')}>
                      <LuFilePen className="w-4 h-4 mr-2" />
                      Edit
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => alert('Copy clicked')}>
                      <LuCopy className="w-4 h-4 mr-2" />
                      Copy
                    </Dropdown.Item>
                    <Dropdown.Separator />
                    <Dropdown.Item onClick={() => alert('Download clicked')}>
                      <LuDownload className="w-4 h-4 mr-2" />
                      Download
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => alert('Share clicked')}>
                      <LuShare className="w-4 h-4 mr-2" />
                      Share
                    </Dropdown.Item>
                    <Dropdown.Separator />
                    <Dropdown.Item destructive onClick={() => alert('Delete clicked')}>
                      <LuTrash2 className="w-4 h-4 mr-2" />
                      Delete
                    </Dropdown.Item>
                  </Dropdown.Content>
                </Dropdown>
              </div>

              {/* Outline Variant */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-3">Outline Variant</h3>
                <Dropdown>
                  <Dropdown.Trigger variant="outline">
                    <LuSettings className="w-4 h-4 mr-2" />
                    Settings
                  </Dropdown.Trigger>
                  <Dropdown.Content align="center">
                    <Dropdown.Item>Account Settings</Dropdown.Item>
                    <Dropdown.Item>Privacy Settings</Dropdown.Item>
                    <Dropdown.Item>Notification Settings</Dropdown.Item>
                    <Dropdown.Separator />
                    <Dropdown.Item>Help & Support</Dropdown.Item>
                    <Dropdown.Item>About</Dropdown.Item>
                  </Dropdown.Content>
                </Dropdown>
              </div>

              {/* Ghost Variant */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-3">Ghost Variant</h3>
                <Dropdown>
                  <Dropdown.Trigger variant="ghost">
                    More Options
                  </Dropdown.Trigger>
                  <Dropdown.Content align="end">
                    <Dropdown.Item>View Details</Dropdown.Item>
                    <Dropdown.Item>Export Data</Dropdown.Item>
                    <Dropdown.Item disabled>Premium Feature</Dropdown.Item>
                    <Dropdown.Separator />
                    <Dropdown.Item>Feedback</Dropdown.Item>
                  </Dropdown.Content>
                </Dropdown>
              </div>
            </div>

            {/* Positioning Examples */}
            <Panel>
              <Panel.Header>
                <h3 className="text-lg font-medium text-gray-900">Positioning Options</h3>
              </Panel.Header>
              <Panel.Body>
                <div className="flex flex-wrap gap-4">
                  <Dropdown>
                    <Dropdown.Trigger variant="outline">Align Start</Dropdown.Trigger>
                    <Dropdown.Content align="start">
                      <Dropdown.Item>Option 1</Dropdown.Item>
                      <Dropdown.Item>Option 2</Dropdown.Item>
                      <Dropdown.Item>Option 3</Dropdown.Item>
                    </Dropdown.Content>
                  </Dropdown>

                  <Dropdown>
                    <Dropdown.Trigger variant="outline">Align Center</Dropdown.Trigger>
                    <Dropdown.Content align="center">
                      <Dropdown.Item>Option 1</Dropdown.Item>
                      <Dropdown.Item>Option 2</Dropdown.Item>
                      <Dropdown.Item>Option 3</Dropdown.Item>
                    </Dropdown.Content>
                  </Dropdown>

                  <Dropdown>
                    <Dropdown.Trigger variant="outline">Align End</Dropdown.Trigger>
                    <Dropdown.Content align="end">
                      <Dropdown.Item>Option 1</Dropdown.Item>
                      <Dropdown.Item>Option 2</Dropdown.Item>
                      <Dropdown.Item>Option 3</Dropdown.Item>
                    </Dropdown.Content>
                  </Dropdown>
                </div>
              </Panel.Body>
            </Panel>

            {/* Code Example */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="text-lg font-medium text-gray-900 mb-3">Usage Example</h3>
              <pre className="text-sm text-gray-800 overflow-x-auto">
{`<Dropdown>
  <Dropdown.Trigger variant="outline">
    Actions
  </Dropdown.Trigger>
  <Dropdown.Content align="end">
    <Dropdown.Item onClick={handleEdit}>Edit</Dropdown.Item>
    <Dropdown.Item onClick={handleCopy}>Copy</Dropdown.Item>
    <Dropdown.Separator />
    <Dropdown.Item destructive onClick={handleDelete}>
      Delete
    </Dropdown.Item>
  </Dropdown.Content>
</Dropdown>`}
              </pre>
            </div>
          </div>
        </Tabs.Content>

        {/* Modal Demo */}
        <Tabs.Content value="modal">
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Modal Component</h2>
              <p className="text-gray-600 mb-6">
                Accessible modal dialog built on top of the Panel component with focus management, keyboard navigation, and backdrop handling.
              </p>
            </div>

            {/* Modal Triggers */}
            <Panel>
              <Panel.Header>
                <h3 className="text-lg font-medium text-gray-900">Modal Sizes</h3>
              </Panel.Header>
              <Panel.Body>
                <div className="flex flex-wrap gap-3">
                  <Button
                    variant="outline"
                    onClick={() => { setModalSize('sm'); setIsModalOpen(true); }}
                  >
                    Small Modal
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => { setModalSize('md'); setIsModalOpen(true); }}
                  >
                    Medium Modal
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => { setModalSize('lg'); setIsModalOpen(true); }}
                  >
                    Large Modal
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => { setModalSize('xl'); setIsModalOpen(true); }}
                  >
                    Extra Large Modal
                  </Button>
                </div>
              </Panel.Body>
            </Panel>

            {/* Features */}
            <Panel>
              <Panel.Header>
                <h3 className="text-lg font-medium text-gray-900">Modal Features</h3>
              </Panel.Header>
              <Panel.Body>
                <ul className="space-y-2 text-gray-600">
                  <li>• <strong>Focus Management:</strong> Automatically focuses modal and restores focus when closed</li>
                  <li>• <strong>Keyboard Navigation:</strong> Escape key to close, tab trapping within modal</li>
                  <li>• <strong>Backdrop Handling:</strong> Click outside to close (configurable)</li>
                  <li>• <strong>Body Scroll Lock:</strong> Prevents background scrolling when modal is open</li>
                  <li>• <strong>Accessibility:</strong> Proper ARIA attributes and screen reader support</li>
                  <li>• <strong>Animation:</strong> Smooth fade and scale animations</li>
                  <li>• <strong>Reusable Structure:</strong> Built on Panel component for consistency</li>
                </ul>
              </Panel.Body>
            </Panel>

            {/* Code Example */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="text-lg font-medium text-gray-900 mb-3">Usage Example</h3>
              <pre className="text-sm text-gray-800 overflow-x-auto">
{`<Modal 
  isOpen={isModalOpen} 
  onClose={() => setIsModalOpen(false)}
  size="md"
>
  <Modal.Header onClose={() => setIsModalOpen(false)}>
    <h3>Modal Title</h3>
  </Modal.Header>
  <Modal.Body>
    Modal content goes here
  </Modal.Body>
  <Modal.Footer>
    <Button variant="outline" onClick={() => setIsModalOpen(false)}>
      Cancel
    </Button>
    <Button variant="primary" onClick={handleSave}>
      Save
    </Button>
  </Modal.Footer>
</Modal>`}
              </pre>
            </div>
          </div>
        </Tabs.Content>
      </Tabs>

      {/* Demo Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        size={modalSize}
      >
        <Modal.Header onClose={() => setIsModalOpen(false)}>
          <h3 className="text-lg font-semibold text-gray-900">
            {modalSize.charAt(0).toUpperCase() + modalSize.slice(1)} Modal Example
          </h3>
        </Modal.Header>
        <Modal.Body>
          <div className="space-y-4">
            <p className="text-gray-600">
              This is a {modalSize} sized modal demonstrating the Modal component functionality.
            </p>
            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-medium text-blue-900 mb-2">Modal Features Demonstrated:</h4>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>✓ Focus management (try tabbing)</li>
                <li>✓ Escape key to close</li>
                <li>✓ Click backdrop to close</li>
                <li>✓ Body scroll prevention</li>
                <li>✓ Smooth animations</li>
              </ul>
            </div>
            <p className="text-gray-600">
              You can interact with the form elements below to test focus management:
            </p>
            <div className="space-y-3">
              <input
                type="text"
                placeholder="Test input field"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <textarea
                placeholder="Test textarea"
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline" onClick={() => setIsModalOpen(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={() => setIsModalOpen(false)}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export { UiDemo, type UiDemoProps };
