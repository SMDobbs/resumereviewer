import { NextRequest, NextResponse } from 'next/server'
import { revokeApiKey } from '@/lib/api-keys'
import { getCurrentUser } from '@/lib/auth'

// Delete/revoke a specific API key
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    
    // Check if user is authenticated
    const user = await getCurrentUser(request)
    if (!user?.id) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Authentication required to delete API keys.' 
        },
        { status: 401 }
      )
    }

    // Revoke the API key
    const success = await revokeApiKey(id, user.id)
    
    if (!success) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'API key not found or already revoked.' 
        },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      message: 'API key revoked successfully.'
    })

  } catch (error) {
    console.error('Error revoking API key:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to revoke API key' },
      { status: 500 }
    )
  }
} 